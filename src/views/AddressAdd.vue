<template>
    <div class="page-address-add">
        <ui-header title="新增收货地址"></ui-header>
        <main class="page-body">
            <div class="address-form">
                <div class="form-item">
                    <label class="label">姓名</label>
                    <input class="input" v-model="address.receiverName" placeholder="请输入姓名">
                </div>
                <div class="form-item">
                    <label class="label">性别</label>
                    <lc-radio class="radio" v-model="address.receiverSex" :label="2">女士</lc-radio>
                    <lc-radio class="radio" v-model="address.receiverSex" :label="1">先生</lc-radio>
                </div>
                <div class="form-item">
                    <label class="label">电话</label>
                    <input class="input" v-model="address.receiverPhone" placeholder="请输入手机号">
                </div>
                <div class="form-item">
                    <label class="label">地址</label>
                    <input class="input" v-model="address.address" placeholder="请输入地址" @click="selectAddress"
                           readonly>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="form-item">
                    <label class="label">门牌号</label>
                    <input class="input" v-model="address.detail" placeholder="请输入门牌信息">
                </div>
                <button class="btn btn-block" @click="save">保存地址</button>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                address: {
                    receiverName: '陈建行',
                    receiverPhone: '15602221234',
                    receiverSex: 2,
//                    address: this.$store.state.address.detail,
                    address: '12121',
                    detail: '1212'
                },
                ignoreAddressRange: false // 地址超出范围仍然保存
            }
        },
        computed: {},
        created () {
            // 判断是哪个页面进来的
            // 地址列表页进来的就清空表单
            if (this.$store.state.prevUrl === 'AddressList') {
                this.$store.state.prevUrl = ''
                this.$store.state.address = {}
            }
            // 地图选择页面进来的就加载之前输入的数据
            if (this.$store.state.prevUrl === 'AddressSelect') {
                this.addAddress = this.$store.state.addAddress
                if (this.$store.state.selectAddress) {
                    console.log(this.$store.state.selectAddress)
                    console.log('哈哈1')
                    this.addAddress.address = this.$store.state.selectAddress.detail
                    console.log('哈哈')
                    this.$store.state.addressSelect = false
                    // 判断选择的地址是否在配送范围
                    if (!this.$store.state.selectAddress.isdispatching) {
                        this.$messageBox({
                            type: 'confirm',
                            title: ' ',
                            message: '您的地址超出商家配送范围了哦',
                            confirmText: '仍然保存',
                            cancelText: '调整地址',
                            confirm: () => {
                                this.ignoreAddressRange = true
                            },
                            cancel: () => {
                                this.selectAddress()
                            }
                        })
                    }
                }
            }
            this.$store.state.prevUrl = 'AddressAdd'
        },
        methods: {
            // 进入地图选择页面
            selectAddress () {
                // 进入页面前保存用户输入的数据
                this.$store.state.addressKeyword = this.address
                this.$store.state.addAddress = this.addAddress
                this.$router.push('/addresses/select')
            },
            save () {
                if (!this.address.receiverName) {
                    this.$toast('请输入姓名')
                    return
                }
                let nameRegex = /[\u4e00-\u9fa5]{2,}/
                if (!nameRegex.test(this.address.receiverName)) {
                    this.$toast('请输入正确的姓名')
                    return
                }
                if (!this.address.receiverPhone) {
                    this.$toast('请输入手机号')
                    return
                }
                var mobileRegex = /^1[358]\d{9}$/
                if (!mobileRegex.test(this.address.receiverPhone)) {
                    this.$toast('手机号码格式错误')
                    return
                }
                if (!this.address.address) {
                    this.$toast('请输入地址')
                    return
                }
                if (!this.address.detail) {
                    this.$toast('请输入门牌信息')
                    return
                }

                this.$http.post('/addresses', this.address)
                    .then(response => {
                        this.$router.go(-1)
                    })
                    .catch(err => {
                        console.log(err)
                        this.$toast('保存失败')
                    })
            }
        },
        watch: {
            name () {
                localStorage.name = this.name
            },
            phone () {
                localStorage.phone = this.phone
            },
            address () {
                this.$store.state.address.detail = this.address
                localStorage.address = this.address
            },
            sex () {
                localStorage.sex = this.sex
            },
            $route () {
                alert('路由')
            }
        }
    }
</script>
