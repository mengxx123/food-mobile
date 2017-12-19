<template>
    <div class="page-about">
        <ui-header></ui-header>
        <main class="page-body">
            <ul class="order-list">
                <router-link class="order-item" :to="'/orders/' + order.id" v-for="order in orders" :key="order.id">
                    <div class="order-header">
                        <img class="logo" src="/static/img/logo.png">
                        <div class="shop-name">酷壳壳健康餐</div>
                        <span class="order-state" v-if="!order.isPay">等待支付</span>
                    </div>
                    <!--<div class="order-bd" :to="'/orderDetail?id=' + order.order.orderId" @click="showDetail(order)">-->
                        <!--<ul class="simple-order-food-list">-->
                            <!--<li class="food-item" v-for="menu in order.listOrderMenu">-->
                                <!--<div class="food-name">{{ menu.menuName }}</div>-->
                                <!--<div class="food-num">X{{ menu.menuNum }}</div>-->
                            <!--</li>-->
                        <!--</ul>-->
                        <!--<div class="info">共 {{ order.listOrderMenu.length }} 件商品，实付 <span-->
                                <!--class="price">¥ {{ order.order.totalFee }}</span></div>-->
                    <!--</div>-->
                    <div class="order-footer">
                        <button class="btn-primary" v-if="order.isReceipt && !!order.isComment" @click="comment(order)">评价
                        </button>
                        <button class="btn-primary" v-if="order.orderStatus == '确认收货'" @click="confirm(order)">确认收货
                        </button>
                        <button class="btn-primary" v-if="!order.isPay" @click.stop="pay(order)">
                            去支付 (还剩{{ order.timeStr }})
                        </button>
                    </div>
                </router-link>
            </ul>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                orders: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let userId = this.$storage.get('user').id
                this.$http.get(`/users/${userId}/orders`)
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        if (data.code === 0) {
                            this.orders = data.data
                        }
                    },
                    response => {
                        console.log(response)
                    })
            },
            pay(order) {
//                this.$store.state.order = order
                this.$router.push(`/orders/${order.id}/pay`)
            },
            comment(order) {
//                this.$router.push('/shop/' + order.order.shopId + '/commentAdd')
            }
        }
    }
</script>

<style scoped>
</style>
