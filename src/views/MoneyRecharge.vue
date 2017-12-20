<template>
    <div class="page page-money-detail">
        <ui-header title="余额充值"></ui-header>
        <main class="page-body" v-if="user">
            <div class="container money-box">
                <div>充值金额</div>
                ￥<input v-model="money">

                <router-link class="btn btn-block" to="/me/money/recharge">充值</router-link>
            </div>
            <div class="keyboard">
                <div class="title">安全输入键盘</div>
                <div class="line">
                    <div class="item">1</div>
                    <div class="item">2</div>
                    <div class="item">3</div>
                </div>
                <div class="line">
                    <div class="item">4</div>
                    <div class="item">5</div>
                    <div class="item">6</div>
                </div>
                <div class="line">
                    <div class="item">7</div>
                    <div class="item">8</div>
                    <div class="item">9</div>
                </div>
                <div class="line">
                    <div class="item">.</div>
                    <div class="item">0</div>
                    <div class="item">←</div>
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
                user: null,
                money: null
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
