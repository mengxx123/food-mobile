<template>
    <div class="page-settings">
        <ui-header title="个人中心"></ui-header>
        <main class="page-body" v-if="user">
            <div class="container">
                <div>{{ user.name }}</div>
                <router-link to="/orders">我的订单</router-link>
                <p>
                    <router-link to="/me/money">余额 ￥10</router-link>
                    <router-link to="/addresses">我的地址</router-link>
                </p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
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
