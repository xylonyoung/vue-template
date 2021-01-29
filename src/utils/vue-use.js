import $api from '@/api'
import getValue from 'get-value'
import icon from '@/icons'

export default {
  install(Vue) {
    Vue.prototype.$api = $api
    Vue.prototype.$getValue = getValue
    Vue.component('icon', icon)
  }
}
