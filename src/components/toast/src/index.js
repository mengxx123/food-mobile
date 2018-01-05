import Vue from 'vue'
import ToastInstance from './toast'

const ToastConstructor = Vue.extend(ToastInstance)

const returnInstance = () => {
    return new ToastConstructor({
        el: document.createElement('div')
    })
}

const removeToast = (e) => {
    if (e.target.parentNode) {
        e.target.parentNode.removeChild(e.target)
    }
}

ToastConstructor.prototype.close = function () {
    this.visible = false
    this.$el.addEventListener('transitionend', removeToast)
    this.closed = true
}

let Toast = function (options = {}) {
    let duration = options.duration || 3000
    let instance = returnInstance()

    instance.closed = false
    clearTimeout(instance.timeout)
    instance.message = typeof options === 'string' ? options : options.message
    instance.position = options.position || 'middle'
    instance.iconClass = options.iconClass || ''

    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
        instance.visible = true
        instance.$el.removeEventListener('transitionend', removeToast)
        instance.timeout = setTimeout(() => {
            if (instance.closed) return
            instance.close()
        }, duration)
    })
}

export default Toast
