<template>
    <div class="page page-shop-detail order">
        <ui-header></ui-header>
        <main class="page-body">
            <div ref="headerRef" class="order-header retainbb" :style="headerStyle">
                <div ref="infoRef" class="header__info">
                    <img src="/static/img/logo.png" alt="" @click="showNotice">

                    <div class="header__title">
                        <h1 @click="showNotice">{{ shopInfo.shopName }}</h1>
                        <span class="tag" v-if="!isCloseShop">营业中</span>
                        <router-link to="search">
                            <i class="iconfont icon-search"></i>
                        </router-link>
                    </div>
                    <div class="header__sound" @click="showNotice">
                        <i class="iconfont icon-sound"></i>
                        <span>催单电话: {{ shopInfo.telephone }}</span>
                    </div>
                </div>
                <div ref="linkRef" class="tab-nav-link">
                    <a href="javascript:;" :class="linkClass(true)" @click="isShowFood=true">点菜</a>
                    <a href="javascript:;" :class="linkClass(false)" @click="isShowFood=false">评价</a>
                </div>
            </div>
            <div class="order-body" :style="bodyStyle">
                <food-list
                        :id="scrollId"
                        v-if="isShowFood"
                        @scroll="handleScroll">
                </food-list>

                <comment-list
                        :id="scrollId"
                        v-if="!isShowFood"
                        @scroll="handleScroll">
                </comment-list>
            </div>
            <div class="notice-mask" v-if="isShowNotice" @click="hideNotice">
                <div class="notice-box">
                    <div class="notice-header">
                        <div class="notice-title">公告</div>
                        <img class="notice-img" src="/static/img/notice.png">
                        <i class="iconfont icon-close-line" @click="hideNotice"></i>
                    </div>
                    <div class="notice-body">
                        <p>催单电话：{{ shopInfo.telephone }}，早点下单早点配送哦！！！</p>
                        <p>营业时间：{{ shopInfo.openTime }}</p>
                    </div>
                </div>
            </div>
            <div class="dialog-mask" v-if="isDialogShow" @click="closeDialog">
                <div class="dialog-box dialog-box-close">
                    <img class="img" src="/static/img/close-shop.png">
                    <div class="text">本店打烊啦</div>
                    <div class="time-text">营业时间： {{ shopInfo.openTime }}</div>
                    <div class="btn-box">
                        <button class="btn-primary" @click="closeDialog">我知道了</button>
                    </div>
                </div>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    import ShoppingCart from '@container/ShoppingCart'
    import FoodList from '@view/FoodList'
    import CommentList from '@view/CommentList'
    import storage from '@util/storage'
    // import { UPDATE_LISTMENU, UPDATE_COMMENTLIST } from '@/store'
    // import cookie from '@util/cookie'

    export default {
        components: {
            ShoppingCart,
            FoodList,
            CommentList
        },
        data () {
            return {
                scrollId: 'scrollId',
                shopInfo: {},
                isShowFood: true,
                infoHeight: 0,
                translate: 0,
                isShowNotice: false,
                isDialogShow: false,
                isCloseShop: false // 是否打烊
            }
        },
        computed: {
            headerStyle () {
                return {
                    transform: `translate(0, ${this.translate}px)`
                }
            },
            bodyStyle () {
                return {
                    top: `${this.headerHeight + this.translate}px`
                }
            },
            listMenu () {
                return this.$store.state.listMenu
            }
        },
        mounted () {
            this.headerHeight = this.$refs.headerRef.offsetHeight
            this.linkHeight = this.$refs.linkRef.offsetHeight
            this.infoHeight = this.headerHeight - this.linkHeight
            const offsetTop = document.querySelector('#scrollId').getBoundingClientRect().top
            this.hasScrollHeight = offsetTop - this.headerHeight
            this.showCloseShopNotice()
            this.getData()
        },
        methods: {
            getData () {
                const shopInfo = storage.get('shopInfo')
                if (shopInfo && shopInfo.shopId === parseInt(this.$route.params.shopId)) {
                    this.shopInfo = shopInfo
                    return
                }
                this.getShop()
            },
            showNotice () {
                this.isShowNotice = true
            },
            hideNotice () {
                this.isShowNotice = false
            },
            showDialog () {
                this.isDialogShow = true
            },
            closeDialog () {
                this.isDialogShow = false
                sessionStorage.hideNotice = true
            },
            showCloseShopNotice () {
                let now = new Date()
                if (now.getHours() < 11 || now.getHours() > 19) {
                    this.isCloseShop = true
                    storage.set('isCloseShop', this.isCloseShop)
                    let hideNotice = sessionStorage.hideNotice
                    if (!hideNotice) {
                        this.showDialog()
                    }
                }
            },
            handleScroll (scroll) {
                if (scroll.y < 0) {
                    if (Math.abs(this.translate) >= this.infoHeight - 5) {
                        return
                    }
                    if (Math.abs(scroll.y) - Math.abs(this.hasScrollHeight) > 0 && Math.abs(scroll.y) - Math.abs(this.hasScrollHeight) < this.infoHeight) {
                        this.translate = scroll.y + Math.abs(this.hasScrollHeight)
                    } else {
                        this.translate = -this.infoHeight
                    }
                } else {
                    if (this.translate < 0 && scroll.y < Math.abs(this.translate)) {
                        this.translate = scroll.y + this.translate
                    } else {
                        this.translate = 0
                    }
                }
            },
            linkClass (bool) {
                return [{
                    'active': bool === this.isShowFood
                }]
            },
            getShop () {
                this.$http.post('/shop/getShops')
                        .then(response => {
                            let data = response.data
                            data.forEach(item => {
                                if (item.shopId === parseInt(this.$route.params.shopId)) {
                                    this.shopInfo = item
                                    storage.setItem('shopInfo', item)
                                }
                            })
                        })
            }
        }
    }
</script>