<template>
    <div class="page page-money">
        <ui-header title="余额"></ui-header>
        <main class="page-body" v-if="user">
            <div class="container card-detail--box">
                <div class="vip-card">
                    <div class="inner">
                        <img class="img" src="/static/img/card-bg.png">
                        <header class="header">
                            <img class="logo" src="/static/img/shop-logo.png">
                            <div class="info">
                                <div>餐餐缘餐饮</div>
                                <div>会员</div>
                            </div>
                            <button class="o-ta--c fz-white" @click="dialogVisible = true">
                                <img src="/static/img/qrcode.svg" alt="" width="21">
                            </button>
                        </header>
                        <footer class="footer">
                            NO.15602221234
                        </footer>
                    </div>
                </div>
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
