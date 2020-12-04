import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './permission'
import $api from './api'
import { getValue } from './utils/get-value'

// mock for fake data
if (process.env.NODE_ENV === 'development') {
	require('./mock')
}

// global api and getValue
Vue.prototype.$api = $api
Vue.prototype.$getValue = getValue

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
