<template>
    <div class="page-home">
        <ui-header></ui-header>
        <main class="page-body">
            <div class="container">
                <router-link to="/about">关于</router-link>
                <router-link to="/shops/1">店铺详情</router-link>
                <div>
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
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                // TODO
                this.$storage.set('user', {
                    id: '1'
                })

                let userId = this.$storage.get('user').id
                this.$http.get(`/users/${userId}/addresses`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            if (data.code === 0) {
                                this.addresses = data.data
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
