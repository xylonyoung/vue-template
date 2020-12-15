import router from './router'
import store from './store'
import { needLoginPaths } from './settings'
import { Message } from 'element-ui'

store.commit('user/SET_TOKEN', localStorage.getItem('token'))

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next('/')
    } else {
      try {
        next()
        // get user info
        await store.dispatch('user/getInfo')

        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/logout')
        Message.error(error || 'Has Error')
        next('/login')
      }
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
