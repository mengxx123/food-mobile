import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const About = resolve => require(['@/views/About'], resolve)

const Order = resolve => require(['@/views/Order'], resolve)
const OrderDetail = resolve => require(['@/views/OrderDetail'], resolve)
const OrderPay = resolve => require(['@/views/OrderPay'], resolve)

const ShopDetail = resolve => require(['@/views/ShopDetail'], resolve)

const Address = resolve => require(['@/views/Address'], resolve)
const AddressAdd = resolve => require(['@/views/AddressAdd'], resolve)
const AddressSelect = resolve => require(['@/views/AddressSelect'], resolve)

const Search = resolve => require(['@/views/Search'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

const APP_NAME = '云设'

let routes = [
    {
        path: '/',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: '关于'
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/shops/:id',
        component: ShopDetail,
        meta: {
            title: '店铺详情'
        }
    },
    {
        path: '/orders',
        component: Order,
        meta: {
            title: '我的订单'
        }
    },
    {
        path: '/orders/:id',
        component: OrderDetail,
        meta: {
            title: '订单详情'
        }
    },
    {
        path: '/orders/:id/pay',
        component: OrderPay,
        meta: {
            title: '在线支付'
        }
    },
    {
        path: '/addresses',
        component: Address,
        meta: {
            title: '收货地址'
        }
    },
    {
        path: '/addresses/add',
        component: AddressAdd,
        meta: {
            title: '添加收货地址'
        }
    },
    {
        path: '/addresses/select',
        component: AddressSelect,
        meta: {
            title: '选择'
        }
    },
    // {
    //     path: '*',
    //     redirect: '/404'
    // },
    {
        path: '/404',
        component: Error404,
        meta: {
            title: '页面找不到了'
        }
    }
]

function getTitle(title) {
    if (title) {
        return title
    } else {
        return APP_NAME
    }
}

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = getTitle(to.meta.title)
    } else {
        document.title = getTitle()
    }
    next()
})

export default router
