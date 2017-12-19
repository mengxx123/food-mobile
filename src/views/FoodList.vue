<template>
    <transition name="bounceInLeft">
        <div style="height: 100%">
            <div class="food">
                <div class="food-type">
                    <a v-for="(item, i) of listMenu"
                       :key="i"
                       href="javascript:;"
                       :data-set="item.menuTypeId"
                       :class="activeType(item.menuTypeId)"
                       @click="scrollTo(item.menuTypeId)">
                        {{item.menuType}}
                    </a>
                </div>
                <div class="order-food-list">
                    <template v-for="(item, index) of listMenu">
                        <lc-scroll-item :key="index" :id="item.menuTypeId">
                            <div class="food-type-title retainbb">
                                {{item.menuType}}
                            </div>
                        </lc-scroll-item>
                        <template v-for="(food, foodIndex) of item.foodList">
                            <lc-scroll-item :key="food.menuId">
                                <food-item
                                        :isLast="(index === listMenu.length-1 && foodIndex === item.foodList.length -1)"
                                        :food="food"
                                        @input="handleNumber">
                                </food-item>
                            </lc-scroll-item>
                        </template>
                    </template>
                </div>
            </div>
            <shopping-cart></shopping-cart>
        </div>
    </transition>
</template>
<script>
    import ShoppingCart from '@container/ShoppingCart'
    import FoodItem from '@container/FoodItem'
    import { UPDATE_LISTMENU, UPDATE_COMMENTLIST, UPDATE_FOODNUMBER } from '@/store'
    import cartAction from './mixin/cartAction'
    import storage from '@util/storage'

    export default {
        mixins: [cartAction],
        components: {
            ShoppingCart,
            FoodItem
        },
        props: {
            scrollId: [String]
        },
        data () {
            return {
                counter: 2,
                active: ''
            }
        },
        computed: {
            listMenu () {
                return this.$store.state.listMenu
            }
        },
        mounted () {
            this.getShopByid()
        },
        methods: {
            goDetail (id) {
                this.$router.push({
                    name: 'foodDetail',
                    params: {
                        foodId: id
                    }
                })
            },
            handleScroll (scroll) {
                this.$emit('scroll', scroll)
                this.setLinkActive(scroll)
            },
            activeType (type) {
                return [{
                    'active': type === this.active
                }]
            },
            scrollTo (id) {
                this.active = id
                this.$refs.scrollFood.scrollToElement(`#${id}`)
            },
            setLinkActive (scroll) {
                let linkArr = this.listMenu
                for (let i = 0; i < linkArr.length; i++) {
                    let top = document.querySelector(`#${linkArr[i].menuTypeId}`).offsetTop
                    if (top <= Math.abs(scroll.y) + 5 && top >= Math.abs(scroll.y) - 5) {
                        this.active = linkArr[i].menuTypeId
                    }
                }
            },
            returnListMenu (list) {
                let typeList = []
                let listMenu = []
                for (let i = 0; i < list.length; i++) {
                    const index = typeList.indexOf(list[i].menuType)
                    this.$set(list[i], 'number', list[i].number || 0)
                    this.$set(list[i], 'cartMenuId', list[i].cartMenuId || null)
                    if (index === -1) {
                        typeList.push(list[i].menuType)
                        listMenu.push({
                            menuType: list[i].menuType,
                            menuTypeId: `menuType_${i}`,
                            foodList: [].concat([list[i]])
                        })
                    } else {
                        listMenu[index].foodList.push(list[i])
                    }
                }
                return listMenu
            },
            getShopByid () {
                const shopId = this.$route.params.shopId
                this.$http.post(`/shop/getShopByid`, this.$qs.stringify({
                    shopId: shopId
                }))
                        .then(response => {
                            const originList = response.data.listMenu

                            const list = this.returnListMenu(originList)
                            this.$store.commit(UPDATE_LISTMENU, list)
                            this.$store.commit(UPDATE_COMMENTLIST, response.data.listAssess)

                            this.$nextTick(() => {
                                this.active = list.length > 0 && list[0].menuTypeId
                                this.$refs.scrollFood.init()
                            })

                            this.getCartByid()
                        })
            },
            getCartByid () {
                this.$http.post('/cart/queryCart', this.$qs.stringify({
                    openId: storage.getItem('openId')
                }))
                        .then(res => {
                            storage.setItem('cartId', res.data.cart.cartId)
                            const listCartMenu = res.data.listCartMenu
                            const state = this.$store.state
                            const listMenu = state.listMenu.reduce((acc, cur) => {
                                return acc.concat(cur.foodList)
                            }, [])

                            for (let i = 0; i < listCartMenu.length; i++) {
                                for (let j = 0; j < listMenu.length; j++) {
                                    if (listCartMenu[i].menuId === listMenu[j].menuId) {
                                        this.$store.commit(UPDATE_FOODNUMBER, {
                                            number: listCartMenu[i].menuNum,
                                            cartMenuId: listCartMenu[i].cartMenuId,
                                            menuId: listCartMenu[i].menuId
                                        })
                                    }
                                }
                            }
                            // TODO
//                            this.$emit
                        })
                        .catch(() => {
                            storage.setItem('cartId', null)
                        })
            }
        }
    }
</script>
