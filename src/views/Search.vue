<template>
    <div class="page-search">
        <ui-header></ui-header>
        <main class="page-body">
            <div class="search-box">
                <div class="input-box">
                    <i class="iconfont icon-search"></i>
                    <input class="input" v-model="keyword" placeholder="搜索店内商品">
                    <i class="iconfont icon-close" @click="clear" v-if="keyword.length"></i>
                </div>
                <a class="cancel" @click="cancelOrSearch">{{ keyword.length ? '搜索' : '取消' }}</a>
            </div>
            <div class="result-empty" v-if="noResult">哎呀，没有搜索结果</div>
            <div class="search-food-list" v-if="foodList.length">
                <lc-scroll ref="scrollSearch">
                    <lc-scroll-item v-for="(food, index) in foodList" :key="food.foodId">
                        <food-item
                                :isLast="index === foodList.length-1"
                                :food="food"
                                @input="handleNumber">
                        </food-item>
                    </lc-scroll-item>
                </lc-scroll>
            </div>

            <shopping-cart v-if="cartVisible"></shopping-cart>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    import ShoppingCart from '@container/ShoppingCart'
    import FoodItem from '@container/FoodItem'
    import {apiDomain} from '@/config'
    import cartAction from './mixin/cartAction'

    export default {
        mixins: [cartAction],
        components: {
            ShoppingCart,
            FoodItem
        },
        data () {
            return {
                keyword: '',
                searchResult: [],
                noResult: false,
                testRad: '1',
                counter: 2
            }
        },
        computed: {
            allFoodList () {
                const listMenu = this.$store.state.listMenu
                return listMenu.reduce((acc, cur) => {
                    return acc.concat(cur.foodList)
                }, [])
            },
            foodList () {
                let result = []
                const searchResult = this.searchResult
                const allList = this.allFoodList
                for (let i = 0; i < searchResult.length; i++) {
                    for (let j = 0; j < allList.length; j++) {
                        if (searchResult[i].menuId === allList[j].menuId) {
                            result.push(allList[j])
                        }
                    }
                }

                return result
            },
            cartVisible () {
                return this.$store.getters.cartList.length > 0
            }
        },
        mounted () {
            console.log(this.allFoodList)
        },
        methods: {
            clear () {
                this.keyword = ''
            },
            cancelOrSearch () {
                if (this.keyword.length) {
                    this.search()
                } else {
                    this.$router.go(-1)
                }
            },
            search () {
                this.noResult = false
                this.$http.post(apiDomain + '/search/searchByName', this.$qs.stringify({
                    shopId: this.$route.params.shopId,
                    name: this.keyword
                })).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.searchResult = response.data
                        if (this.foodList.length === 0) {
                            this.noResult = true
                        }
                        this.$nextTick(() => {
                            this.$refs.scrollSearch.init()
                        })
                    },
                    response => {
                        console.log(response)
                        this.$toast('系统出错')
                    })
            },
            goDetail () {
                this.$router.push('/foodDetail/1')
            }
        }
    }
</script>
