<template>
    <header class="page-header">
        <div class="container">
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
        }
    }
</script>
