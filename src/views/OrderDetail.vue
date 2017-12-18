<template>
    <div class="order-detail-page" v-if="order">
        <!--<div class="order-detail-box" v-if="order.order.orderStatus == '支付成功'">-->
            <!--<i class="state-icon iconfont icon-success-fill"></i>-->
            <!--<div class="state">订单已经完成</div>-->
            <!--<div class="info">感谢您对酷壳壳的信任，欢迎再次光临</div>-->
            <!--<button class="btn-primary" @click="comment" v-if="order.order.isAssess === '否'">评价</button>-->
        <!--</div>-->
        <!--<div class="order-detail-box" v-if="order.order.orderStatus == '等待支付'">-->
            <!--<img class="svg" src="/static/img/wait-pay.svg">-->
            <!--<div class="state">等待支付</div>-->
            <!--<div class="info">逾期未支付，订单将自动取消</div>-->
            <!--<div class="btn-box">-->
                <!--<button class="btn-primary-line btn-1" @click="cancel(order)">取消订单</button>-->
                <!--<button class="btn-primary" @click="pay(order)">去支付（还剩{{ timeStr }}）</button>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="order-detail-box" v-if="order.order.orderStatus == '商家处理中'">-->
            <!--<i class="state-icon iconfont icon-hourglass"></i>-->
            <!--<div class="state">商家处理中</div>-->
            <!--<div class="info">商品准备中。由商家配送，配送进度请咨询商家</div>-->
            <!--<div class="distribution"><i class="iconfont icon-clock"></i> 预计送达时间 <span class="time">18:36</span>-->
            <!--</div>-->
            <!--<div class="btn-box">-->
                <!--<button class="btn-primary btn-1" @click="showDialog">申请退款</button>-->
                <!--<button class="btn-primary" @click="confirm">确认收货</button>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="order-detail-box" v-if="order.order.orderStatus == '订单已取消-手动取消'">-->
            <!--<i class="state-icon iconfont icon-pay-failure"></i>-->
            <!--<div class="state">订单已取消</div>-->
            <!--<div class="info">你取消了订单</div>-->
        <!--</div>-->
        <!--<div class="order-detail-box" v-if="order.order.orderStatus == '订单已取消-支付超时'">-->
            <!--<i class="state-icon iconfont icon-pay-failure"></i>-->
            <!--<div class="state">订单已取消</div>-->
            <!--<div class="info">超过15分钟未支付，系统取消了订单。</div>-->
        <!--</div>-->
        <div class="recommend-box">
            <router-link class="box-header" :to="`/shops/1`">
                <img class="logo" src="/static/img/logo.png">
                <div class="shop-name">真功夫</div>
                <i class="iconfont icon-right"></i>
            </router-link>
            <div class="box-body">
                <ul class="order-good-list">
                    <li class="good-item" v-for="menu in order.listOrderMenu" :key="menu.menuId">
                        <img class="food-img" :src="getImage(menu.menuPicUrl)">
                        <div>
                            <div class="good-name">{{ menu.menuName }}</div>
                            <div class="good-num">x{{ menu.menuNum }}</div>
                        </div>
                        <div class="price-box">
                            <div class="price-new">¥ {{ menu.menuDiscountPrice }}</div>
                            <div class="price-old">¥ {{ menu.menuPrice }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="order-info-box">
            <div class="info-item distribution">
                <div>配送费</div>
                <div>¥ 5</div>
            </div>
            <div class="info-item price">
                <div class="price-old">优惠 ¥ 12</div>
                <div class="price-new">小计 ¥ 12</div>
            </div>
            <a href="tel:15602221234" class="info-item contact">
                <i class="iconfont icon-phone"></i><span>联系商家</span>
            </a>
        </div>
        <ul class="meta-list">
            <li class="meta-item">
                <span class="meta-key">配送时间</span>
                <span class="meta-value">立即配送</span>
            </li>
            <li class="meta-item">
                <span class="meta-key">配送地址</span>
                <span class="meta-value">
                    <span>陈建行（先生） 15602221234</span>
                    <span>这是详情地址啊啊啊啊啊啊啊啊</span>
                </span>
            </li>
            <li class="meta-item">
                <span class="meta-key">配送服务</span>
                <span class="meta-value">由 商家 提供配送服务</span>
            </li>
        </ul>
        <ul class="meta-list">
            <li class="meta-item">
                <span class="meta-key">订单号码</span>
                <span class="meta-value">1234 1234 1234 1234</span>
            </li>
            <li class="meta-item">
                <span class="meta-key">订单时间</span>
                <span class="meta-value">2015-09-09 12:12:28</span>
            </li>
            <li class="meta-item">
                <span class="meta-key">支付方式</span>
                <span class="meta-value">货到付款</span>
            </li>
            <li class="meta-item">
                <span class="meta-key">订单备注</span>
                <span class="meta-value">手机话题坏了，短信联系</span>
            </li>
            <li>
                <button id="btn-copy" class="btn-copy" :data-clipboard-text="'1234 1234 1234 1234'" type="button">复制
                </button>
            </li>
        </ul>
        <!--<div class="dialog-mask" v-if="isDialogShow">-->
            <!--<div class="dialog-box">-->
                <!--<img class="img" src="/static/img/refund.png">-->
                <!--<div class="text">抱歉！本店暂不支持线上退款，若需退款，请-->
                    <!--拨打店铺电话，小二会为你处理好的哦！-->
                <!--</div>-->
                <!--<div class="btn-box">-->
                    <!--<button class="btn-primary btn-1" @click="closeDialog">我知道了</button>-->
                    <!--<a href="tel:15602221234" class="btn-primary">商家电话</a>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                order: {},
                isDialogShow: false,
                discountMoney: 0,
                second: 15 * 60,
                timeStr: '12分30秒'
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let orderId = this.$route.params.id
                this.$http.get(`/orders/${orderId}`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.order = data.data
                            }
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
