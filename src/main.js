import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './styles/theme.scss';
import i18n from './lang' // internationalization
import './permission'
import $api from './api'
import { getValue } from './utils/get-value'

// mock for fake data
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
})

// global api and getValue
Vue.prototype.$api = $api
Vue.prototype.$getValue = getValue

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
