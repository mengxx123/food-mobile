import Vue from 'vue'
import MessageInstance from './message'

const MessageBoxConstructor = Vue.extend(MessageInstance)

const returnInstance = () => {
    return new MessageBoxConstructor({
        el: document.createElement('div')
    })
}

// const removeMessageBox = e => {
//   if (e.target.parentNode) {
//     e.target.parentNode.removeChild(e.target)
//   }
// }

const addMask = () => {
    if (document.querySelectorAll('.message-mask').length > 0) return

    let mask = document.createElement('div')
    mask.className = 'message-mask'
    mask.style.cssText = 'position: fixed;top: 0;left: 0;z-index: 1000;width: 100%;height: 100%;background: #000;opacity: .5;'

    document.body.appendChild(mask)
}

const MessageBox = function (options) {
    let instance = returnInstance()

    instance.confirmText = options.confirmText || '确定'
    instance.cancelText = options.cancelText || '取消'
    instance.visible = true
    instance.message = typeof options === 'string' ? options : options.message
    instance.type = options.type || 'alert'
    instance.title = options.title || '提示'
    instance.confirm = typeof options.confirm === 'function' ? options.confirm : function () {
    }
    instance.cancel = typeof options.cancel === 'function' ? options.cancel : function () {
    }
    addMask()
    document.body.appendChild(instance.$el)
}

export default MessageBox
