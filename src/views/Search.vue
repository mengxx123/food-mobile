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
            <div class="result-empty" v-if="result === 0">哎呀，没有搜索结果</div>
            <div class="search-food-list" v-if="goodses.length">
                <food-item v-for="goods in goodses" :key="goods.id"
                   :goods="goods"
                   @input="handleNumber">
                </food-item>
            </div>

            <shopping-cart v-if="cartVisible"></shopping-cart>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    import ShoppingCart from '@container/ShoppingCart'
    import FoodItem from '@container/FoodItem'
    import cartAction from './mixin/cartAction'

    export default {
        mixins: [cartAction],
        components: {
            ShoppingCart,
            FoodItem
        },
        data () {
            return {
                keyword: '手表',
                goodses: [],
                result: 1, // 搜索结果，1：未知，0：没有结果
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
                let shopId = this.$route.params.id
                this.result = 1
                this.$http.get(`/shops/${shopId}/search?keyword=${this.keyword}`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        if (data.code === 0) {
                            this.goodses = data.data
                            if (!this.goodses.length) {
                                this.result = 0
                            }
                        }
                    },
                    response => {
                        console.log(response)
                        this.$toast('系统出错')
                        this.result = -1
                    })
            },
            goDetail () {
                this.$router.push('/foodDetail/1')
            }
        }
    }
</script>
