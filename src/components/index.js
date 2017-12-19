import header from './header'
import footer from './footer'
import Radio from './radio'

export default {
    install: function (Vue) {
        Vue.component('lcRadio', Radio)

        Vue.component('ui-header', header)
        Vue.component('ui-footer', footer)
    }
}
