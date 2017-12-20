import Header from './header'
import Footer from './footer'
import Radio from './radio'
import Loading from './loading'

export default {
    install: function (Vue) {
        Vue.component('lcRadio', Radio)

        Vue.component('ui-header', Header)
        Vue.component('ui-footer', Footer)
        Vue.component('ui-loading', Loading)
    }
}
