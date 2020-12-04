import router from './router'
import store from './store'
import { Message } from 'element-ui'

const whiteList = ['/login', '/register'] // no redirect whitelist

store.commit('user/SET_TOKEN', localStorage.getItem('token'))

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
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
        next({ path: '/login' })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: '/login' })
    }
  }
})
