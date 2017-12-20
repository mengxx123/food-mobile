<template>
    <div :class="['food-item', {}]">
        <img :src="goods.image" alt="" @click="goDetail(goods.id)">
        <div>
            <h3 @click="goDetail(goods.id)">{{ goods.name }}</h3>
            <p @click="goDetail(goods.id)">{{ goods.description }}</p>
            <span class="sales">月销 {{ goods.monthSells }}</span>
            <div>
                <span class="actual">￥{{ goods.discountPrice }}</span>
                <span class="amount">￥{{ goods.price }}</span>
                <div class="counter-container" v-if="isCloseShop">
                    <lc-counter
                            :menuItem="goods"
                            :value="goods.number"
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
            goods: [Object],
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
                this.$router.push(`/goodses/${id}`)
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

