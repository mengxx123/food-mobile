<template>
    <footer class="page-nav">
        <ul class="nav-list">
            <li class="item" :class="{active: isActive('/home')}">
                <router-link class="link" to="/home">
                    <i class="icon icon-home icon-inactive"></i>
                    <i class="icon icon-home-fill icon-active"></i>
                    <div class="text">首页</div>
                </router-link>
            </li>
            <li class="item" :class="{active: isActive('/all')}">
                <router-link class="link" to="/all">
                    <i class="icon icon-category icon-inactive"></i>
                    <i class="icon icon-category icon-active"></i>
                    <div class="text">分类</div>
                </router-link>
            </li>
            <li class="item" :class="{active: isActive('/cart')}">
                <router-link class="link" to="/me/cart">
                    <i class="icon icon-cart icon-inactive"></i>
                    <i class="icon icon-cart icon-active"></i>
                    <div class="text">购物车</div>
                </router-link>
            </li>
            <li class="item" :class="{active: isActive('/me')}">
                <router-link class="link" to="/me">
                    <i class="icon icon-user icon-inactive"></i>
                    <i class="icon icon-user-fill icon-active"></i>
                    <div class="text">我</div>
                </router-link>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        methods: {
            goback () {
                this.$router.go(-1)
            },
            isActive(url) {
                console.log(location.href.indexOf(url), url)
                return location.href.indexOf(url) !== -1
            }
        }
    }
</script>
