import router from './router'
import store from './store'
import { needLoginPaths } from './settings'

//check token expired or not
store.dispatch('user/checkToken')

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/account/login') {
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
    if (needLoginPaths.some(e => to.path.includes(e))) {
      next('/account/login')
    } else {
      next()
    }
  }
})
