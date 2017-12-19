export default {
    log(name, msg) {
        console.log('%c ' + name + (msg ? '：' : ''), 'color: #09c')
        if (msg) {
            console.log(msg)
        }
    }
}
