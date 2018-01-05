<template>
    <div class="page page-money">
        <ui-header title="钱包"></ui-header>
        <main class="page-body" v-if="user">
            <div class="container money-box">
                <router-link to="/me/bankCards">银行卡</router-link>
                <div class="title">账户余额</div>
                <div class="money">￥<span class="value">0.00</span></div>
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
