<template>
    <div class="page page-address-select">
        <ui-header title="地址选择"></ui-header>
        <main class="page-body">
            <div class="search-box">
                <div class="input-box">
                    <i class="iconfont icon-search"></i>
                    <input id="suggestId" class="input" placeholder="查找收货地址" v-model="keyword">
                </div>
                <a class="cancel" @click="back">取消</a>
            </div>
            <div id="l-map" class="map"></div>
            <div class="select-address-list-box">
                <div class="select-address-list">
                    <li class="address-item" v-for="address in addresses" @click="select(address)">
                        <div class="title">{{ address.title }}</div>
                        <div class="detail">{{ address.detail }}</div>
                    </li>
                </div>
            </div>
            <div id="flag">
                <a><span class="mui-icon mui-icon-plusempty"></span></a>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    import storage from '@/util/storage'

    export default {
        data () {
            return {
                keyword: '保利叁悦',
                map: null,
                lsearch: null,
                addresses: []
            }
        },
        mounted () {
            this.keyword = this.$store.state.addressKeyword
            console.log('666', this.$store.state.addressKeyword)
            this.initMap()
        },
        watch: {
            keyword () {
                console.log(this.keyword)
                this.lsearch.search(this.keyword)
            }
        },
        methods: {
            back () {
                this.$store.state.prevUrl = 'AddressSelect'
                this.$router.go(-1)
            },
            getShopPosition () {
                /* eslint-disable no-undef */
                let shopInfo = storage.get('shopInfo')

                // debug
                shopInfo = {
                    shopName: '普通的店',
                    shopAddress: '广州市海珠区万胜围d出口',
                    longitude: 113.391484,
                    latitude: 23.108221
                }
                console.log(shopInfo.shopAddress)
                this.basePoint = new BMap.Point(shopInfo.longitude, shopInfo.latitude)
                this.map.centerAndZoom(this.basePoint, 14)
                // 创建标注
                let marker = new BMap.Marker(this.basePoint)
                this.map.addOverlay(marker)
                // 标注提示
                let opts = {
                    width: 200,
                    height: 100,
                    title: shopInfo.shopName,
                    enableMessage: true,
                    message: ''
                }
                let infoWindow = new BMap.InfoWindow('地址：' + shopInfo.shopAddress, opts)
                marker.addEventListener('click', () => {
                    this.map.openInfoWindow(infoWindow, point)
                })
                // 圆形范围
                let circle = new BMap.Circle(this.basePoint, 3000, {
                    strokeColor: '#09c',
                    strokeWeight: 1,
                    fillColor: '#E2E8F1',
                    fillOpacity: 0.3
                })
                this.map.addOverlay(circle)
//        let BMap = window.BMap
//        var myGeo = new BMap.Geocoder()
//        // 创建地址解析器实例
                // 将地址解析结果显示在地图上,并调整地图视野
//        myGeo.getPoint(shopInfo.shopAddress, point => {
//          if (point) {
//          } else {
//            this.$toast('您选择地址没有解析到结果!')
//          }
//        }, '广州市')
            },
            initMap () {
                let BMap = window.BMap
                var map = new BMap.Map('l-map')
                this.map = map
                map.enableScrollWheelZoom()    // 启动鼠标滚轮操作
                // 获取店铺坐标
                this.getShopPosition()

//        map.addEventListener('moveend', () => {
//          var center = map.getCenter()
//          var local = new BMap.LocalSearch(map, {
//            renderOptions: {selectFirstResult: true},
//            onSearchComplete: function (results) {
//              if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
//                this.addresses = []
//                for (var i = 0; i < results.getCurrentNumPois(); i++) {
//                  this.addresses.push({
//                    title: results.getPoi(i).title,
//                    detail: results.getPoi(i).address,
//                    point: results.getPoi(i).point
//                  })
//                }
//              }
//            }
//          }))

                // 搜索结果
                this.initSearch()

                // 自动定位
//        var geolocation = new BMap.Geolocation()
//        geolocation.getCurrentPosition(function (r) {
//          if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
//            // let currentPonit = r.point
//            map.centerAndZoom(r.point, 14)
//            map.panTo(r.point)
//            // 创建地理编码实例
//            var myGeo = new BMap.Geocoder()
//            // 根据坐标得到地址描述
//            myGeo.getLocation(r.point, function (result) {
//              if (result) {
//                console.log('地址')
//                console.log(result.address)
//              }
//            })
//          } else {
//            // alert("定位失败：" + this.getStatus());
//          }
//        }, {enableHighAccuracy: true})
            },
            initSearch () {
                this.lsearch = new window.BMap.LocalSearch(this.map)

                this.lsearch.setSearchCompleteCallback(results => {
                    if (this.lsearch.getStatus() === window.BMAP_STATUS_SUCCESS) {
                        this.addresses = []
                        for (let i = 0; i < results.getCurrentNumPois(); i++) {
                            console.log(results.getPoi(i))
                            this.addresses.push({
                                title: results.getPoi(i).title,
                                detail: results.getPoi(i).address,
                                point: results.getPoi(i).point
                            })
                        }
                        console.log('啦啦啦')
                        // 定位到搜索结果的第一个
//            var point = this.lsearch.getResults().getPoi(0).point
//            var distance = (this.map.getDistance(point, this.basePoint)).toFixed(2)
//            this.map.centerAndZoom(point, 14)
//            if (distance <= 3000) {
//              // alert("你的选择是：" + title + " 与最近的仓库的距离是：" + distance + "米，目前该地址尚不在配送范围内！")
//            } else {
//              // alert("你的选择是：" + title + " 与最近的仓库的距离是：" + distance + "米，恭喜你，该地址在配送范围内！")
//            }
                    }
                })
                this.lsearch.setPageCapacity(100)
                this.lsearch.search(this.keyword) // debug
            },
            select (address) {
                console.log('选择地址')
                console.log(address)
                var distance = (this.map.getDistance(address.point, this.basePoint)).toFixed(2)
                let isdispatching
                if (distance <= 3000) {
                    isdispatching = true
                }
                if (!isdispatching) {
                    console.log('你的选择是：' + address.title + ' 与最近的仓库的距离是：' + distance + '米，目前该地址尚不在配送范围内！')
                } else {
                    console.log('你的选择是：' + address.title + ' 与最近的仓库的距离是：' + distance + '米，恭喜你，该地址在配送范围内！')
                }
                this.$store.state.prevUrl = 'AddressSelect'
                this.$store.state.selectAddress = {
                    title: address.title,
                    detail: address.detail,
                    distance: distance,
                    isdispatching: isdispatching,
                    point: address.point
                }
                this.$router.go(-1)
            }
        }
    }
</script>
