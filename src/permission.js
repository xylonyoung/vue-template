import router from './router'
import store from './store'
import { needLoginPaths } from './settings'

//check token expired or not
;(function getToken() {
  if (localStorage.getItem('expired') > new Date().getTime()) {
    store.commit('user/SET_TOKEN', localStorage.getItem('token'))
  }
})()

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next('/')
    } else {
      if (!store.getters.user.name) {
        // get user info
        await store.dispatch('user/getInfo')
      }
      next()
    }
  } else {
    /* has no token*/
    if (needLoginPaths.includes(to.path)) {
      next('/login')
    } else {
      next()
    }
  }
})
