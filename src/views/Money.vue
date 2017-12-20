<template>
    <div class="page page-money">
        <ui-header title="余额"></ui-header>
        <main class="page-body" v-if="user">
            <div class="container money-box">
                <div class="title">账户余额</div>
                <div class="money">￥<span class="value">0.00</span></div>
                <router-link class="btn btn-block btn-recharge" to="/me/money/recharge">充值</router-link>
                <button class="btn btn-block btn-outline btn-2">现提</button>
                <router-link class="faq" to="/faq">常见问题</router-link>
                <router-link to="/me/money/detail">余额明细</router-link>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: null
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
                            if (data.code === 0) {
                                this.user = data.data
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
