<template>
    <div>
        <div :class="classes">
            <div class="cart__icon" @click="openCartList">
                <i class="iconfont icon-shopping-card"></i>
            </div>
            <div class="cart__content" @click="openCartList">
                <div v-if="totalDiscountPrice > 0">
                    <span class="cart__actual">￥{{totalDiscountPrice}}</span>
                    <span class="cart__amount">￥{{totalMenutPrice}}</span>
                </div>
                <span class="cart__postage">另需配送费￥{{ postage }}</span>
            </div>
            <div v-if="totalDiscountPrice === 0" class="cart__button">
                <span>￥{{ benchmark }}元起送</span>
            </div>
            <div v-if="totalDiscountPrice > 0 && cartRest < 0" class="cart__button">
                <span>差￥{{ Math.abs(cartRest) }}元起送</span>
            </div>
            <button
                    v-if="totalDiscountPrice !== 0 && cartRest >= 0"
                    class="cart__button has-reach"
                    @click="handleSettle">
                <span>去结算</span>
            </button>
        </div>
        <transition name="cartListBounce">
            <div v-if="visible" class="cart-list-wrap">
                <div class="mask" @click="closeCartList"></div>
                <div class="cart-list">
                    <div class="cart-list-hd">
                        <span>已选商品{{ cartList.length }}</span>
                        <button @click="clearCart">
                            <i class="iconfont icon-delete"></i>
                            清空购物车
                        </button>
                    </div>
                    <div class="cart-list-bd">
                        <div class="cart-list-item retainbb" v-for="item of cartList" :key="item.menuId">
                            <span>{{item.menuName}}</span>
                            <div class="counter-container">
                                <lc-counter
                                        :key="item.menuId"
                                        :menuItem="item"
                                        :value="item.number"
                                        @input="handleNumber">
                                </lc-counter>
                            </div>
                            <span class="actual">￥{{item.discountPrice}}</span>
                            <span class="amount">￥{{item.menuPrice}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import {UPDATE_FOODNUMBER} from '@/store'
    import cartAction from '@view/mixin/cartAction'
    import storage from '@util/storage'

    export default {
        mixins: [cartAction],
        data () {
            return {
                counter: 2,
                visible: false, // 是否显示菜单列表
                postage: 0,
                benchmark: 0,
                isShopClosed: true
            }
        },
        mounted () {
            this.postage = storage.getItem('shopInfo') ? storage.getItem('shopInfo').sendFee : 5
            this.benchmark = storage.getItem('shopInfo') ? storage.getItem('shopInfo').startSend : 20
        },
        computed: {
            classes () {
                return [
                    'shopping-cart',
                    {
                        'has-good': this.totalDiscountPrice > 0,
                        'close': this.isShopClosed
                    }
                ]
            },
            cartRest () {
                return parseFloat((this.totalDiscountPrice - this.benchmark).toFixed(2))
            },
            listMenu () {
                return this.$store.state.listMenu
            },
            cartList () {
                return this.$store.getters.cartList
            },
            totalDiscountPrice () {
                return this.$store.getters.totalDiscountPrice
            },
            totalMenutPrice () {
                return this.$store.getters.totalMenutPrice
            }
        },
        methods: {
            openCartList () {
                this.visible = true
            },
            closeCartList () {
                this.visible = false
            },
            returnCartList (list) {
                let foodList = list.reduce((acc, cur) => {
                    return acc.concat(cur.foodList)
                }, [])
                return foodList.filter(item => item.number > 0)
            },
            clearCartList () {
                const list = [].concat(this.cartList)
                for (let i = 0; i < list.length; i++) {
                    let menuId = list[i].menuId

                    this.$store.commit(UPDATE_FOODNUMBER, {
                        menuId: menuId,
                        number: 0,
                        cartMenuId: null
                    })
                }
            },
            handleSettle () {
                this.$router.push('orderConfirm')
            },
            clearCart () {
                this.$http.post('/cart/clearCart', this.$qs.stringify({
                    cartId: storage.getItem('cartId')
                }))
                    .then(() => {
                        storage.setItem('cartId', null)
                        this.clearCartList()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

