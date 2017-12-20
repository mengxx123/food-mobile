<template>
    <div class="page page-money-detail">
        <ui-header title="余额明细"></ui-header>
        <main class="page-body" v-if="user">
            <div class="container money-box">
                <div>tab: 全部 收入 支出</div>
                <div class="empty-box">
                    <img class="ic" src="/static/img/empty.svg">
                    <div>未找到记录</div>
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
