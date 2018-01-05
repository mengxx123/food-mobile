import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const About = resolve => require(['@/views/About'], resolve)

const Order = resolve => require(['@/views/Order'], resolve)
const OrderDetail = resolve => require(['@/views/OrderDetail'], resolve)
const OrderPay = resolve => require(['@/views/OrderPay'], resolve)

const ShopDetail = resolve => require(['@/views/ShopDetail'], resolve)

const GoodsDetail = resolve => require(['@/views/GoodsDetail'], resolve)

const Address = resolve => require(['@/views/Address'], resolve)
const AddressAdd = resolve => require(['@/views/AddressAdd'], resolve)
const AddressSelect = resolve => require(['@/views/AddressSelect'], resolve)
const AddressUpdate = resolve => require(['@/views/AddressUpdate'], resolve)

const Search = resolve => require(['@/views/Search'], resolve)
const Cart = resolve => require(['@/views/Cart'], resolve)
const All = resolve => require(['@/views/All'], resolve)

const Settings = resolve => require(['@/views/Settings'], resolve)

const Me = resolve => require(['@/views/Me'], resolve)
const MeV2 = resolve => require(['@/views/MeV2'], resolve)
const Money = resolve => require(['@/views/Money'], resolve)
const Wallet = resolve => require(['@/views/Wallet'], resolve)

const BankCard = resolve => require(['@/views/BankCard'], resolve)
const BankCardDetail = resolve => require(['@/views/BankCardDetail'], resolve)

const Card = resolve => require(['@/views/Card'], resolve)
const CardDetail = resolve => require(['@/views/CardDetail'], resolve)
const Score = resolve => require(['@/views/Score'], resolve)
const Coupon = resolve => require(['@/views/Coupon'], resolve)
const MoneyDetail = resolve => require(['@/views/MoneyDetail'], resolve)
const MoneyRecharge = resolve => require(['@/views/MoneyRecharge'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

const APP_NAME = '云设'

let routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
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
        path: '/all',
        component: All,
        meta: {
            title: '分类'
        }
    },
    {
        path: '/goodses/:id',
        component: GoodsDetail,
        meta: {
            title: '商品详情'
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
        path: '/shops/:id/search',
        component: Search,
        meta: {
            title: '搜索店内商品'
        }
    },
    {
        path: '/me/cart',
        component: Cart,
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/me/orders',
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
        path: '/me/addresses',
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
        path: '/addresses/:id/update',
        component: AddressUpdate,
        meta: {
            title: '修改收货地址'
        }
    },
    {
        path: '/addresses/select',
        component: AddressSelect,
        meta: {
            title: '选择'
        }
    },
    {
        path: '/me',
        component: Me,
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/me/v2',
        component: MeV2,
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/me/money',
        component: Money,
        meta: {
            title: '余额'
        }
    },
    {
        path: '/me/wallet',
        component: Wallet,
        meta: {
            title: '钱包'
        }
    },
    {
        path: '/me/bankCards',
        component: BankCard,
        meta: {
            title: '银行卡'
        }
    },
    {
        path: '/me/bankCards/:id',
        component: BankCardDetail,
        meta: {
            title: '银行卡'
        }
    },
    {
        path: '/me/cards',
        component: Card,
        meta: {
            title: '卡包'
        }
    },
    {
        path: '/cards/:id',
        component: CardDetail,
        meta: {
            title: '卡片详情'
        }
    },
    {
        path: '/me/score',
        component: Score,
        meta: {
            title: '积分'
        }
    },
    {
        path: '/me/settings',
        component: Settings,
        meta: {
            title: '设置'
        }
    },
    {
        path: '/me/coupon',
        component: Coupon,
        meta: {
            title: '优惠券'
        }
    },
    {
        path: '/me/money/detail',
        component: MoneyDetail,
        meta: {
            title: '余额明细'
        }
    },
    {
        path: '/me/money/recharge',
        component: MoneyRecharge,
        meta: {
            title: '充值'
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
