<template>
    <div class="page page-card">
        <ui-header title="分类"></ui-header>
        <main class="page-body" v-if="user">
            <ul class="card-list">
                <li class="item" v-for="card in cards">
                    <router-link class="link" to="/cards/1">
                        <header class="header">
                            <img class="logo" src="/static/img/shop-logo.png">
                            <div class="info">
                                <div>餐餐缘餐饮</div>
                                <div>微信会员卡1</div>
                            </div>
                        </header>
                    </router-link>
                </li>
            </ul>
            <div class="container card-box">
                <div class="empty-box" v-if="!cards.length">
                    <img class="ic" src="/static/img/empty.svg">
                    <div class="text">你还没有开通卡片</div>
                </div>
            </div>
        </main>
        <ui-footer></ui-footer>
        <ui-nav></ui-nav>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: null,
                cards: [1, 2, 3],
                dialogVisible: false
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
