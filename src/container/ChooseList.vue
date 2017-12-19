<template>
    <div class="order-confirm-food">
        <div class="recommend-box">
            <router-link class="box-header" :to="shopUrl">
                <img class="logo" src="/static/img/logo.png">
                <div class="shop-name">酷壳壳健康餐</div>
                <i class="iconfont icon-right"></i>
            </router-link>
            <div class="box-body">
                <ul class="order-good-list">
                    <li class="good-item" v-for="item of cartList" :key="item.menuId">
                        <img class="food-img" src="/static/img/demo-1.png">
                        <div>
                            <div class="good-name">{{item.menuName}}</div>
                            <div class="good-num">x{{item.number}}</div>
                        </div>
                        <div class="price-box">
                            <div class="price-new">¥ {{item.discountPrice}}</div>
                            <div class="price-old">¥ {{item.menuPrice}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="order-info-box">
                <div class="info-item distribution">
                    <div>配送费</div>
                    <div>¥ 5</div>
                </div>
                <div class="info-item price">
                    <div class="price-old">已优惠 ¥ {{discount}}</div>
                    <div class="price-new">小计 ¥ {{totalDiscountPrice}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            shopUrl () {
                return `/shop/${this.$route.params.shopId}/home`
            },
            addressListUrl () {
                return `/shop/${this.$route.params.shopId}/addressList`
            },
            cartList () {
                return this.$store.getters.cartList
            },
            totalDiscountPrice () {
                return this.$store.getters.totalDiscountPrice
            },
            totalMenutPrice () {
                return this.$store.getters.totalMenutPrice
            },
            discount () {
                return (this.totalMenutPrice - this.totalDiscountPrice).toFixed(2)
            },
            takeOutInfo () {
                return this.$store.state.takeOutInfo
            }
        }
    }
</script>
