import util from '@/util/util'

function param(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return unescape(r[2])
    }
    return null
}

function restTime(sec) {
    let minute = parseInt(sec / 60)
    if (minute < 10) {
        minute = '0' + minute
    }
    let second = sec % 60
    if (second < 10) {
        second = '0' + second
    }
    return minute + '分' + second + '秒'
}

function orderTimer(order, update, timeout) {
    if (order.order.orderStatus !== '等待支付') {
        // timeout && timeout()
        return null
    }
    if (new Date().getTime() - order.order.orderTime > 15 * 60 * 1000) {
        timeout && timeout()
        return null
    }
    let timer = null
    let updateTime = () => {
        let second = Math.floor(15 * 60 - (new Date().getTime() - order.order.orderTime) / 1000)
        if (second <= 0) {
            if (timer) {
                clearInterval(timer)
            }
            timeout && timeout()
        } else {
            update && update(util.restTime(second))
        }
    }
    updateTime()
    timer = setInterval(updateTime, 1000)
    return timer
}

export default {
    param: param,
    restTime: restTime,
    orderTimer: orderTimer
}
