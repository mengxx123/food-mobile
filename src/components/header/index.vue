<template>
    <header class="page-header">
        <div class="container">
            <button class="back" @click="back">返回2</button>
            <div>{{ title }}</div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            title: {
                default: '默认标题'
            }
        },
        mounted() {
        },
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>
