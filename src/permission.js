import router from './router'
import store from './store'
import { title, needLoginPaths } from './settings'

//check token expired or not
store.dispatch('user/checkToken')

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  const subtitle = to.meta.title

  // set page title
  document.title = subtitle ? `${subtitle} - ${title}` : title

  if (token) {
    if (to.path === '/account/login') {
      // if is logged in, redirect to the home page
      next('/')
    } else {
      next()
      if (!store.getters.user.name) {
        // get user info
        await store.dispatch('user/getInfo')
      }
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
