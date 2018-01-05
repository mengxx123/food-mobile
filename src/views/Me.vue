<template>
    <div class="page page-me">
        <ui-header title="个人中心"></ui-header>
        <main class="page-body" v-if="user">
            <div class="user-info-box">
                <img class="avatar" :src="user.avatar || '/static/img/cartoon-avatar.svg'">
                <img class="vip" src="/static/img/vip.svg">
                <div class="name">{{ user.name }}</div>
            </div>
            <div class="container">

                <router-link to="/me/v2">新版本</router-link>
                <router-link to="/orders">我的订单</router-link>
                <p>
                    <router-link to="/me/addresses">我的地址</router-link>
                </p>
            </div>

            <section class="page-me-section">
                <header class="header">
                    <h2 class="title">我的资产</h2>
                </header>
                <ul class="list">
                    <li class="item">
                        <router-link class="link" to="/me/wallet">
                            <i class="icon icon-package"></i>
                            <h3 class="title">我的钱包</h3>
                            <div class="content"></div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/money">
                            <i class="icon icon-money"></i>
                            <h3 class="title">余额</h3>
                            <div class="content">￥10.00</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/score">
                            <i class="icon icon-score"></i>
                            <h3 class="title">积分</h3>
                            <div class="content">100 分</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/cards">
                            <i class="icon icon-card"></i>
                            <h3 class="title">卡包</h3>
                            <div class="content">0 张</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/coupon">
                            <i class="icon icon-coupon"></i>
                            <h3 class="title">抵用券</h3>
                            <div class="content">1张待使用</div>
                        </router-link>
                    </li>
                </ul>
            </section>
            <section class="page-me-section">
                <header class="header">
                    <h2 class="title">美团服务</h2>
                </header>
                <ul class="list">
                    <li class="item">
                        <router-link class="link" to="/me/money">
                            <i class="icon icon-member"></i>
                            <h3 class="title">会员中心</h3>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/money">
                            <i class="icon icon-mobile_recharge"></i>
                            <h3 class="title">手机充值</h3>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/score">
                            <i class="icon icon-invoice"></i>
                            <h3 class="title">发票助手</h3>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/me/money">
                            <i class="icon icon-service"></i>
                            <h3 class="title">客服中心</h3>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/about">
                            <i class="icon icon-about"></i>
                            <h3 class="title">关于美团</h3>
                        </router-link>
                    </li>
                </ul>
            </section>

        </main>
        <ui-footer></ui-footer>
        <ui-nav></ui-nav>
        <ui-loading v-if="loadingVisible"></ui-loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: null,
                loadingVisible: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let userId = this.$storage.get('user').id
                this.$http.get(`/users/${userId}`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            this.user = data
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
