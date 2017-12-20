<template>
    <div class="loading-box">
        <div class="dialog">
            <img :src="image">
            <!--<div>加载中</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                image: '/static/img/anim-0.png',
                imageIndex: 0
            }
        },
        props: {
        },
        destroyed() {
            clearInterval(this.timerId)
        },
        mounted() {
            this.timerId = setInterval(() => {
                let images = [
                    '/static/img/anim-0.png',
                    '/static/img/anim-1.png',
                    '/static/img/anim-2.png',
                    '/static/img/anim-3.png',
                    '/static/img/anim-2.png',
                    '/static/img/anim-1.png'
                ]
                this.imageIndex = (this.imageIndex + 1) % images.length
                this.image = images[this.imageIndex]
            }, 100)
        },
        methods: {
        }
    }
</script>
