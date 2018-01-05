import Header from './header'
import Footer from './footer'
import Nav from './nav'
import Radio from './radio'
import Loading from './loading'
import Toast from './toast'
import MessageBox from './message-box'

export default {
    install: function (Vue) {
        Vue.component('lcRadio', Radio)

        Vue.component('ui-header', Header)
        Vue.component('ui-footer', Footer)
        Vue.component('ui-nav', Nav)
        Vue.component('ui-loading', Loading)

        Vue.prototype.$toast = Toast
        Vue.prototype.$messageBox = MessageBox
    }
}
