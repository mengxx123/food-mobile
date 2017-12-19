<template>
    <div :class="['food-item', {'retainbb': !isLast}]">
        <img :src="returnImg(food.picUrl)" alt="" @click="goDetail(food.menuId)">
        <div>
            <h3 @click="goDetail(food.menuId)">{{food.menuName}}</h3>
            <p @click="goDetail(food.menuId)">{{food.menuDetail}}</p>
            <span class="sales">月销 {{food.monthSells}}</span>
            <div>
                <span class="actual">￥{{food.discountPrice}}</span>
                <span class="amount">￥{{food.menuPrice}}</span>
                <div class="counter-container" v-if="isCloseShop">
                    <lc-counter
                            :menuItem="food"
                            :value="food.number"
                            @input="handleNumber">
                    </lc-counter>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import storage from '@util/storage'

    export default {
        props: {
            food: [Object],
            isLast: [Boolean],
            isCloseShop: storage.get('isCloseShop')
        },
        data () {
            return {
                counter: 2
            }
        },
        mounted () {
            this.startTime = new Date().getTime()
        },
        methods: {
            goDetail (id) {
                // a hack to stop quick click
                let time = new Date().getTime() - this.startTime
                if (time < 100) {
                    return
                }
                this.$router.push({
                    name: 'foodDetail',
                    params: {
                        foodId: id
                    }
                })
            },
            returnImg (url) {
                return this.$oss.retSignatureUrl(url)
            },
            handleNumber (val, menuItem) {
                this.$emit('input', val, menuItem)
            }
        }
    }
</script>

