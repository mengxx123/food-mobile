<template>
    <div class="page page-address">
        <ui-header title="收货地址"></ui-header>
        <main class="page-body">
            <h4 class="range">
                <div class="tip">可选择以下地址</div>
                <div class="manage" @click="manage">{{ managing ? '完成' : '管理' }}</div>
            </h4>
            <div class="empty-box empty-location" v-if="!addresses.length">
                <img class="ic" src="/static/img/cartoon-location.svg">
                <div class="text">主人还没有收货地址 </div>
                <div class="text">快来添加一个吧～</div>
            </div>
            <ul class="address-list address-list-in" :class="{managing: managing}">
                <li class="address-item" v-for="address in addresses">
                    <i class="icon icon-remove" @click="remove(inAddresses, address)" v-if="managing"></i>
                    <div class="address-content" @click="select(address)">
                        <div class="detail">{{ address.detail }}</div>
                        <div class="info">
                            <span>{{ address.receiverName }}</span>
                            <span>{{ address.receiverSex === 1 ? '男' : '女' }}</span>
                            <span>{{ address.receiverPhone }}</span>
                        </div>
                    </div>
                    <lc-radio class="radio" v-model="checked" :label="address.addressId"
                              @click.native="select(address)" v-if="!managing"></lc-radio>
                    <i class="icon icon-edit" v-if="managing" @click="select(address)"></i>
                </li>
            </ul>
            <h4 class="range" v-if="outAddresses.length">以下地址不在配送范围</h4>
            <ul class="address-list address-list-out" :class="{managing: managing}">
                <li class="address-item" v-for="address in outAddresses" :key="address.addressId">
                    <i class="icon icon-remove" @click="remove(outAddresses, address)" v-if="managing"></i>
                    <div>
                        <div class="detail">{{ address.detailAddress }}</div>
                        <div class="info">
                            <span>{{ address.personName }}</span>
                            <span>{{ address.sex }}</span>
                            <span>{{ address.phoneNum }}</span>
                        </div>
                    </div>
                    <lc-radio class="radio" label="none" v-if="!managing"></lc-radio>
                    <i class="icon icon-edit" @click="updateAddress" v-if="managing"></i>
                </li>
            </ul>
            <a class="btn-bottom" @click="add">新增收货地址</a>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                addresses: [],
                inAddresses: [],
                outAddresses: [],
                managing: true
            }
        },
        computed: {
            checked: {
                get () {
                    return this.$store.state.takeOutInfo.addressId
                },
                set (val) {
                    this.$store.commit('UPDATE_TAKEOUTINFO', {
                        ...this.$store.state.takeOutInfo,
                        addressId: val
                    })
                }
            }
        },
        mounted () {
            this.getData()
            if (this.$store.state.takeOutInfo) {
                this.checked = this.$store.state.takeOutInfo.addressId
            }
        },
        methods: {
            getData () {
                let userId = this.$storage.get('user').id
                this.$http.get(`/users/${userId}/addresses`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            this.addresses = data
                        },
                        response => {
                            console.log(response)
                        })
//                this.$http.post(apiDomain + '/address/getAddressByOpenId', qs.stringify({
//                    openId: storage.get('openId')
//                })).then(
//                    response => {
//                        let data = response.data
//                        console.log(data)
//                        // 如果没有地址，跳转到添加地址页面
//                        if (!data.length && this.$store.state.prevUrl !== 'AddressAdd') {
//                            this.add()
//                        }
//                        // 在范围内还是范围外
//                        let shopInfo = storage.get('shopInfo')
//                        let BMap = window.BMap
//                        let map = new BMap.Map('l-map')
//                        data.forEach((address) => {
//                            let addressPoint = new BMap.Point(parseFloat(address.isContain.split(',')[0]), parseFloat(address.isContain.split(',')[1]))
//                            let shopPoint = new BMap.Point(shopInfo.longitude, shopInfo.latitude)
//                            let distance = map.getDistance(addressPoint, shopPoint)
//                            console.log('距离' + distance)
//                            if (distance < 3000) {
//                                this.inAddresses.push(address)
//                            } else {
//                                this.outAddresses.push(address)
//                            }
//                        })
//                        this.$nextTick(() => {
//                            this.$refs.scroll.init()
//                        })
//                        setTimeout(() => {
//                            console.log('啦啦')
//                            this.$refs.scroll.init()
//                        }, 1000)
//                    },
//                    response => {
//                        console.log(response)
//                    })
            },
            select (address) {
                if (this.managing) {
                    this.updateAddress(address)
                } else {
                    console.log(address)
                    this.$store.state.takeOutInfo = {
                        ...this.$store.state.takeOutInfo,
                        personName: address.personName,
                        sex: address.sex,
                        phoneNumber: address.phoneNum,
                        address: address.detailAddress,
                        addressId: address.addressId
                    }

                    this.$router.go(-1)
                }
            },
            add () {
                this.$store.state.prevUrl = 'AddressList'
                this.$store.state.address = {}
                this.$router.push('/addresses/add')
            },
            manage () {
                this.managing = !this.managing
            },
            remove (addresses, address) {
                console.log('删除', address)
                this.$messageBox({
                    type: 'confirm',
                    title: ' ',
                    message: '确认删除?',
                    confirmText: '确认',
                    cancelText: '取消',
                    confirm: () => {
                        this.removeAjax(addresses, address)
                    },
                    cancel: () => {
                    }
                })
            },
            removeAjax (addresses, address) {
                this.$http.delete(`/addresses/${address.id}`)
                    .then(response => {
                        for (let i = 0; i < addresses.length; i++) {
                            if (addresses[i].id === address.id) {
                                addresses.splice(i, 1)
                            }
                        }
                    },
                    response => {
                        console.log(response)
                        this.$toast('保存失败')
                    })
            },
            updateAddress (address) {
                this.$router.push(`/addresses/${address.id}/update`)
            }
        },
        watch: {
            checked () {
//        this.$router.push('/orderConfirm/takeout')
            }
        }
    }
</script>
