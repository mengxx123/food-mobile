<template>
    <div class="page page-goods-detail">
        <ui-header></ui-header>
        <main class="page-body" v-if="goods">
            <div class="food-detail">
                <div class="food-detail-container" :style="containerStyle">
                    <div class="food__img">
                        <img :src="foodImg" alt="">
                    </div>
                    <div class="food-info">
                        <h2 class="food__name">{{ goods.name }}</h2>
                        <span class="sales">月销 {{ goods.monthSells }}</span>
                        <span class="actual">￥{{ goods.discountPrice }}</span>
                        <span class="amount">￥{{ goods.price }}</span>
                        <button class="btn btn-orange add-to-cart" @click="addToCart">加入购物车</button>
                        <div class="food-intro retainbt">
                            <span class="food-intro-hd">商品信息</span>
                            <p>{{ goods.description }}</p>
                        </div>
                    </div>
                    <div class="food-comment">
                        <div class="food-comment-hd retainbb">
                            <span>外卖评价<span class="great-comment">(好评度<i class="red">100%</i>)</span></span>
                            <router-link :to="allCommentUrl">{{commentList.length}}条评价<i
                                    class="iconfont icon-right"></i></router-link>
                        </div>
                        <div class="comment-list">
                            <comment-item
                                    v-for="(item, i) of commentList"
                                    :key="item.assessId"
                                    :isLast="i === commentList.length-1"
                                    :head="item.headPic"
                                    :name="item.personName"
                                    :time="item.time"
                                    :score="item.shopScore"
                                    :content="item.content"
                                    :pic1="item.pic1"
                                    :pic2="item.pic2"
                                    :pic3="item.pic3">
                            </comment-item>
                        </div>
                    </div>
                </div>

                <shopping-cart v-if="cartVisible"></shopping-cart>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>
<script>
    import CommentItem from '@container/CommentItem'
    import storage from '@util/storage'
    import formatDate from '@util/date'
    import {UPDATE_FOODNUMBER, UPDATE_CARTID} from '@/store'
    import ShoppingCart from '@container/ShoppingCart'

    export default {
        components: {
            CommentItem,
            ShoppingCart
        },
        data () {
            return {
                goods: null,
                commentList: [],
                foodImg: ''
            }
        },
        computed: {
            containerStyle () {
                return {
                    'bottom': this.cartVisible ? '0.47rem' : '0'
                }
            },
            cartVisible () {
                return this.goods.number > 0
            },
            allCommentUrl () {
                const params = this.$route.params
                return `/shop/${params.shopId}/foodComment/${params.foodId}`
            }
        },
        mounted () {
            this.getAssessByMenuId()
            this.getFoodDetail()

            this.foodImg = this.$oss.retSignatureUrl(this.detail.picUrl)
        },
        methods: {
            getAssessByMenuId () {
                this.$http.post('/search/getAssessByMenuId', this.$qs.stringify({
                    menuId: this.$route.params.foodId
                }))
                    .then(response => {
                        this.allCommentList = response.data
                        this.commentList = response.data.slice(0, 2)
                        this.$nextTick(() => {
                            this.$refs.scroll.init()
                        })
                    })
            },
            getFoodDetail () {
                const goodsId = this.$route.params.id
                this.$http.get(`/goodses/${goodsId}`)
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        if (data.code === 0) {
                            this.goods = data.data
                        }
                    })
            },
            addToCart () {
                this.detail.number += 1
                this.addCart(this.detail.number, this.detail)
            },
            addCart (val, menuItem) {
                let url = '/cart/createCart'
                let params = {
                    openId: storage.getItem('openId'),
                    menuId: menuItem.menuId,
                    menuName: menuItem.menuName,
                    menuPrice: menuItem.menuPrice,
                    discountPrice: menuItem.discountPrice,
                    createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
                }
                if (storage.getItem('cartId')) {
                    params.cartId = storage.getItem('cartId')
                    url = '/cart/addCart'
                }

                this.$http.post(url, this.$qs.stringify(params))
                    .then(response => {
                        this.$store.commit(UPDATE_CARTID, response.data.cartId)
                        this.$store.commit(UPDATE_FOODNUMBER, {
                            menuId: menuItem.menuId,
                            number: val,
                            cartMenuId: response.data.cartMenuId
                        })

                        storage.setItem('cartId', response.data.cartId)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

