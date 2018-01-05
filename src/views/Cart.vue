<template>
    <div class="page page-card">
        <ui-header title="购物车"></ui-header>
        <main class="page-body">
            <ul class="main-cart-list">
                <li class="item" v-for="item in cartItems">
                    <router-link class="link" to="/cards/1">
                        <header class="header">
                        </header>
                        <router-link class="goods" :to="'/goodses/' + item.goods.id">
                            <img class="goods-img" src="/static/img/shop-logo.png">
                            <div class="info">
                                <div>{{ item.goods.name }}</div>
                                <div>￥{{ item.goods.discountPrice }}</div>
                            </div>
                        </router-link>
                    </router-link>
                </li>
            </ul>
            <div class="container">
                <div v-if="!cartItems.length">
                    购物车为空222222
                    <router-link to="">去逛逛</router-link>
                </div>

            </div>
        </main>
        <ui-footer></ui-footer>
        <ui-nav></ui-nav>
        <div class="cart-calculate-box">
            <div>合计：￥2366.00</div>
            <a class="btn pay">去结算</a>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: null,
                cartItems: [],
                dialogVisible: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let userId = this.$storage.get('user').id
                this.$http.get(`/users/${userId}/cart`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            this.cartItems = data
                        },
                        response => {
                            console.log(response)
                        })
            }
        }
    }
</script>

<style scoped>
</style>
