<template>
    <div class="page page-order-pay">
        <ui-header></ui-header>
        <main class="page-body" v-if="order">
            <div class="confirm-pay">
                <div class="time-box">
                    <div class="time-text">支付剩余时间</div>
                    <div class="time">{{ timeStr }}</div>
                </div>
                <h4 class="pay-type">选择支付方式</h4>
                <ul class="pay-list">
                    <li class="pay-item">
                        <i class="iconfont icon-wechat-pay"></i>
                        <div class="pay-text">微信支付</div>
                        <lc-radio class="checkbox" v-model="check" :label="55"></lc-radio>
                    </li>
                </ul>
                <!--{{result}}-->
                <div class="btn-bottom" @click="confirm">确认支付 ¥ {{ order.totalMoney }}</div>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    import util from '@/util/util'
    import md5 from 'js-md5'

    /* global WeixinJSBridge */
    const APP_ID = 'wx38ed313e7961205a'
    const APP_KEY = '88cade88cab9e7d2487eyf86311983f2'

    export default {
        data () {
            return {
                order: {},
                check: 55,
                second: 15 * 60,
                timeStr: '14: 57',
                prepayId: '',
                paySign: '',
                result: ''
            }
        },
        mounted () {
            this.getData()
            this.getPrepayId()
//      this.onBridgeReady()
        },
        destroyed () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        methods: {
            getData () {
                console.log(this.$route.params.id)
                let orderId = this.$route.params.id
                this.$http.get(`/orders/${orderId}`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.order = data.data

                                this.timer = util.orderTimer(this.order, timeStr => {
                                    this.timeStr = timeStr
                                }, this.timeout)
                            }
                        },
                        response => {
                            console.log(response)
                        })
            },
            timeout () {
                this.$router.replace(`/orderDetail/${this.$route.params.orderId}`)
            },
            confirm () {
                this.onBridgeReady()
            },
            getPrepayId () {
                this.$http.post('/wx/unified', this.$qs.stringify({
                    orderId: this.$route.params.orderId
                }))
                    .then(res => {
                        this.result = 'wx/unified 参数' + this.$route.params.orderId + '回调：' + JSON.stringify(res)
                        this.prepayId = res.data.data
                    })
            },
            onBridgeReady () {
                this.result = ' ' + JSON.stringify(this.result) + `prepay_id=${this.prepayId}`
                if (typeof WeixinJSBridge === 'undefined') {
                    return this.$toast('请使用微信浏览器打开')
                }
                const that = this

                const nonceStr = this.generateRandomAlphaNum(32)
                const timeStamp = Math.floor(new Date().getTime() / 1000).toString()
                const stringStr = `appId=${APP_ID}&nonceStr=${nonceStr}&package=prepay_id=${this.prepayId}&signType=MD5&timeStamp=${timeStamp}&key=${APP_KEY}`
                const signature = md5(stringStr).toUpperCase()

                this.result = ' mySign: ' + signature

                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        'appId': APP_ID, // 公众号名称，由商户传入
                        'timeStamp': timeStamp, // 时间戳，自1970年以来的秒数
                        'nonceStr': nonceStr, // 随机串
                        'package': 'prepay_id=' + this.prepayId,
                        'signType': 'MD5', // 微信签名方式
                        'paySign': signature // 微信签名
                    },
                    res => {
                        this.result += ' ' + res + 'dfdfdfdfdf'
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        if (res.err_msg === 'get_brand_wcpay_request:ok') {
                            that.$router.push(`/orderDetail/${this.$route.params.orderId}`)
                        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                            this.$toast('你取消了支付')
                        } else {
                            alert(JSON.stringify(res))
                        }
                    }
                )
            },
            generateRandomAlphaNum (len) {
                var rdmString = ''
                for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
                return rdmString.substr(0, len)
            },
            getJsApiInfo () {
                // const nonceStr = this.generateRandomAlphaNum(32)
                // const timeStamp = Math.floor(new Date().getTime() / 1000).toString()
                // const stringStr = `appId=${APP_ID}&nonceStr=${nonceStr}&package=prepay_id=${this.prepayId}&signType=MD5&timeStamp=${timeStamp}&key=${APP_KEY}`
                // const signature = md5(stringStr).toUpperCase()
                this.$http.post('/wx/getJsApiInfo')
                    .then(res => {
                        this.result = ' ' + JSON.stringify(this.result) + JSON.stringify(res.data)

                        this.appId = res.data.appId
                        this.nonceStr = res.data.nonceStr
                        this.signature = res.data.signature
                        this.timestamp = res.data.timestamp
                        this.url = res.data.url

                        this.onBridgeReady()
                    })
            }
        }
    }
</script>
