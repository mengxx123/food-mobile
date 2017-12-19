<template>
    <div :class="['comment-item', { 'retainbb': !isLast}]">
        <div class="head">
            <img :src="myHead" alt="">
        </div>
        <div class="comment-content">
            <span class="name">{{ name }}</span>
            <span class="time">{{ myDate }}</span>
            <div class="score">
                <lc-stars :score="score"></lc-stars>
            </div>
            <p>{{ content }}</p>
            <div class="comment-imgs">
                <img v-if="pic1" :src="myPic1" alt="" @click="imgPreview">
                <img v-if="pic2" :src="myPic2" alt="" @click="imgPreview">
                <img v-if="pic3" :src="myPic3" alt="" @click="imgPreview">
            </div>
        </div>

        <lc-img-preview :visible.sync="previewVisible" :imgs="imgs"></lc-img-preview>
    </div>
</template>
<script>
    import formatDate from '@util/date'

    export default {
        props: {
            isLast: [Boolean],
            pic1: [String],
            pic2: [String],
            pic3: [String],
            head: {
                type: String,
                default: '/static/img/demo-1.png'
            },
            name: {
                type: String,
                default: '爱吃零食的女强人'
            },
            time: {
                type: [String, Number],
                default: 1504073251000
            },
            score: {
                type: [String, Number]
            },
            content: {
                type: String,
                default: '好好吃啊，减肥必备餐，好评好评好评，重要的事说三遍！好好吃啊，减肥必备餐，好评好评好评，重要的事说三遍！好好吃啊，减肥必备餐，好评好评好评，重要的事说三遍！'
            },
            pics: {
                type: Array
            }
        },
        data () {
            return {
                imgs: [],
                previewVisible: false,
                myPic1: '',
                myPic2: '',
                myPic3: '',
                myHead: '',
                myDate: ''
            }
        },
        mounted () {
            this.myDate = formatDate(this.time)
            this.myHead = this.$oss.retSignatureUrl(this.head)
            this.myPic1 = this.$oss.retSignatureUrl(this.pic1)
            this.myPic2 = this.$oss.retSignatureUrl(this.pic2)
            this.myPic3 = this.$oss.retSignatureUrl(this.pic3)
        },
        methods: {
            imgPreview () {
                this.previewVisible = true
            }
        }
    }
</script>
