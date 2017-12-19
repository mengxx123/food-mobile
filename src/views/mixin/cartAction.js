import formatDate from '@util/date'
import {UPDATE_FOODNUMBER, UPDATE_CARTID} from '@/store'
import storage from '@util/storage'

export default {
    methods: {
        handleNumber (val, menuItem) {
            console.log('handleNumber')
            val > menuItem.number ? this.addCart(val, menuItem) : this.removeCart(val, menuItem)
        },
        addCart (val, menuItem) {
            let url = '/cart/createCart'
            console.log(storage.getItem('openId'))
            let params = {
                openId: storage.getItem('openId'),
                menuId: menuItem.menuId,
                menuName: menuItem.menuName,
                menuPrice: menuItem.menuPrice,
                discountPrice: menuItem.discountPrice,
                createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
            }
            if (storage.getItem('cartId')) {
                params.cartId = storage.getItem('cartId')
                url = '/cart/addCart'
            }

            this.$http.post(url, this.$qs.stringify(params))
                .then(response => {
                    console.log('addcart', response)
                    this.$store.commit(UPDATE_CARTID, response.data.cartId)
                    this.$store.commit(UPDATE_FOODNUMBER, {
                        menuId: menuItem.menuId,
                        number: val,
                        cartMenuId: response.data.cartMenuId
                    })

                    storage.setItem('cartId', response.data.cartId || null)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        removeCart (val, menuItem) {
            this.$http.post('/cart/removeCart', this.$qs.stringify({
                cartMenuId: menuItem.cartMenuId
            }))
                .then(() => {
                    this.$store.commit(UPDATE_FOODNUMBER, {
                        menuId: menuItem.menuId,
                        number: val,
                        cartMenuId: menuItem.cartMenuId
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
