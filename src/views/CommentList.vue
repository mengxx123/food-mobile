<template>
    <transition name="bounceInRightAndOutRight">
        <div style="height: 100%">
            <div class="seller-score">
                <div class="seller-score__inner">
                    <span class="score">{{shopScore}}</span>
                    <span>商家评分</span>
                </div>
                <div class="stars-container">
                    <lc-stars :size="24" :score="shopScore"></lc-stars>
                </div>
            </div>
            <div class="comment-list-container">
                <div class="comment-type">
                    <button :class="retBtnCls('all')" @click="filterList()">全部({{allListLength}})</button>
                    <button :class="retBtnCls('img')" @click="filterList('img')">有图({{hasImgCount}})</button>
                </div>
                <div class="comment-list">
                    <comment-item
                            v-for="(item, i) of commentList"
                            :key="item.assessId"
                            :isLast="i === commentList.length-1"
                            :head="item.headPic"
                            :name="item.personName"
                            :time="item.time"
                            :score="item.shopScore"
                            :content="item.content">
                    </comment-item>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import CommentItem from '@container/CommentItem'

    export default {
        components: {
            CommentItem
        },
        props: {
            scrollId: [String]
        },
        data () {
            return {
                listType: 'all'
            }
        },
        computed: {
            hasImgCount () {
                return this.retImgCommentList(this.$store.state.commentList).length
            },
            allListLength () {
                return this.$store.state.commentList.length
            },
            allList () {
                return this.$store.state.commentList
            },
            commentList () {
                return this.listType === 'all' ? this.$store.state.commentList.concat(this.$store.state.commentList) : this.retImgCommentList(this.$store.state.commentList)
            },
            shopScore () {
                const length = this.allList.length
                const totalScore = this.allList.reduce((acc, cur) => {
                    return acc + parseFloat(cur.shopScore)
                }, 0)
                return length === 0 ? 5 : (totalScore / length).toFixed(1)
            }
        },
        methods: {
            handleScroll (scroll) {
                this.$emit('scroll', scroll)
            },
            retImgCommentList (list) {
                return list.filter(item => (item.pic1 || item.pic2 || item.pic3))
            },
            filterList (type = 'all') {
                this.listType = type
            },
            retBtnCls (type) {
                return [
                    'btn btn-default',
                    {
                        'active': this.listType === type
                    }
                ]
            }
        }
    }
</script>
