<template>
    <div class="page page-address-add">
        <ui-header title="修改收货地址"></ui-header>
        <div class="page-body">
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
        </div>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                address: {}
            }
        },
        mounted () {
            if (this.$store.state.prevUrl === 'AddressSelect') {
                // 地图选择页面进来的就加载之前输入的数据
                console.log(this.$store.state.addAddress)
                this.addAddress = this.$store.state.addAddress
                this.addAddress.address = this.$store.state.selectAddress.detail
            } else {
                // 如果从地址列表页面进来的，则加载本地存储中的数据
                this.getData()
            }
        },
        methods: {
            getData() {
                let addressId = this.$route.params.id
                this.$http.get(`/addresses/${addressId}`)
                    .then(response => {
                            let data = response.data
                            console.log(data)
                            this.address = data
                        },
                        response => {
                            console.log(response)
                        })
            },
            // 进入地图选择页面
            selectAddress () {
                // 进入页面前保存用户输入的数据
                this.$store.state.addressKeyword = this.address
                this.$store.state.addAddress = this.addAddress
                this.$router.push('/shop/' + this.$route.params.shopId + '/addressSelect')
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

                this.$http.put('/addresses/' + this.address.id, this.address)
                    .then(response => {
                        this.$router.go(-1)
                    },
                    response => {
                        console.log(response)
                        this.$toast('保存失败')
                        this.$router.go(-1)
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
                localStorage.address = this.address
            },
            sex () {
                localStorage.sex = this.sex
            }
        }
    }
</script>
