<template>
    <lc-scroll>
        <ul class="order-list">
            <li class="order-item" v-for="order in orders" :key="order.state" v-if="isShow(order)">
                <div class="order-header">
                    <img class="logo" src="/static/img/logo.png">
                    <div class="shop-name">{{ order.order.shopName }}</div>
                    <div class="order-state">{{ statusText(order) }}</div>
                </div>
                <div class="order-bd" :to="'/orderDetail?id=' + order.order.orderId" @click="showDetail(order)">
                    <ul class="simple-order-food-list">
                        <li class="food-item" v-for="menu in order.listOrderMenu">
                            <div class="food-name">{{ menu.menuName }}</div>
                            <div class="food-num">X{{ menu.menuNum }}</div>
                        </li>
                    </ul>
                    <div class="info">共 {{ order.listOrderMenu.length }} 件商品，实付 <span
                            class="price">¥ {{ order.order.totalFee }}</span></div>
                </div>
                <div class="order-footer"
                     v-if="order.order.orderStatus == '等待支付' || order.order.orderStatus == '确认收货' || order.order.orderStatus == '支付成功'">
                    <button class="btn-primary" v-if="order.order.orderStatus == '支付成功' && order.order.isAssess === '否'"
                            @click="comment(order)">评价
                    </button>
                    <button class="btn-primary" v-if="order.order.orderStatus == '确认收货'" @click="confirm(order)">确认收货
                    </button>
                    <button class="btn-primary" v-if="order.order.orderStatus == '等待支付'" @click="pay(order)">
                        去支付 (还剩{{ order.timeStr }})
                    </button>
                </div>
            </li>
        </ul>
    </lc-scroll>
</template>

<script>
    import {apiDomain} from '@/config'
    const qs = require('qs')

    export default {
        props: {
            orders: {
                type: Array,
                default: () => {
                    return []
                }
            },
            all: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                timers: []
            }
        },
        mounted () {
            this.initTimer()
        },
        updated () {
            if (!this.isInitTimer) {
                this.isInitTimer = true
//        this.initTimer()
            }
        },
        methods: {
            initTimer () {
                console.log(this.orders.length)
                this.orders.forEach((order, index) => {
                    if (order.order.orderStatus === '等待支付' && new Date() - new Date(order.order.orderTime) < 15 * 60 * 1000) {
                        console.log('小');
                        ((order, index) => {
                            let timer = setInterval(() => {
                                let second = Math.floor(15 * 60 - (new Date() - new Date(order.order.orderTime)) / 1000)
                                if (second <= 0) {
                                    clearInterval(timer)
                                    this.timeout()
                                } else {
                                    let minute = parseInt(second / 60)
                                    if (minute < 10) {
                                        minute = '0' + minute
                                    }
                                    let s = second % 60
                                    if (s < 10) {
                                        s = '0' + s
                                    }

                                    this.$set(this.orders, index, order)
                                    order.timeStr = minute + '分' + s + '秒'
                                    order.order.shopName = '2121'
                                    console.log('啦啦' + s)
                                    console.log(order)
                                }
                            }, 1000)
                            this.timers.push(timer)
                        })(order, index)
                    } else {
                        console.log('大')
                    }
                })
            },
            showDetail (order) {
                this.$store.state.order = order
                this.$router.push('/orderDetail/' + order.order.orderId)
            },
            statusText (order) {
                if (order.order.orderStatus === '等待支付') {
                    if (new Date() - new Date(order.order.orderTime) > 15 * 60 * 1000) {
                        return '订单已取消'
                    }
                }
                if (order.order.orderStatus.indexOf('订单已取消') !== -1) {
                    return '订单已取消'
                }
                return order.order.orderStatus
            },
            comment (order) {
                this.$router.push('/shop/' + order.order.shopId + '/commentAdd')
            },
            clear () {
                this.keyword = ''
            },
            confirm (order) {
                console.log(order)
                this.$http.post(apiDomain + '/order/confirmGet', qs.stringify({
                    orderId: order.order.orderId
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(
                    response => {
//              this.$router.push('/addressList')
                        this.$router.go(0)
                    },
                    response => {
                        this.$toast('保存失败')
                    })
            },
            pay (order) {
                this.$store.state.order = order
                this.$router.push(`/confirmPay/${order.order.orderId}`)
            },
            isShow (order) {
                if (this.all) {
                    return true
                }
//        if (order.order.orderStatus === '确认收货' && order.order.isAssess === '是') {
//          return false
//        }
                return false
            }
        }
    }
</script>