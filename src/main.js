import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './style/element-variables.scss'
import i18n from './lang' // internationalization
import './permission' // permission control
import './style/index.scss' // global css
import setVue from './utils/set-vue'

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
})
// mock for fake data
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}
//set global functions, variables, components, etc.
Vue.use(setVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
