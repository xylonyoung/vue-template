import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './style/element-variables.scss'
import i18n from './lang' // internationalization
import './permission' // permission control
import './style/index.scss' // global css
import resize from './utils/resize'
import vueUse from './utils/vue-install'

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

//set global functions, variables, components, etc.
Vue.use(vueUse)

// mock for fake data
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  mixins: [resize],
  render: h => h(App)
}).$mount('#app')
