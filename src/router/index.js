import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
  },
  {
    path: '/agreement',
    component: () => import('@/views/agreement/agreement'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/home'),
      },
    ],
  },
  {
    path: '/login',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('@/views/login/login'),
      },
    ],
  },

  {
    path: '/about-us',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'AboutUs',
        component: () => import('@/views/about-us/about-us'),
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/user'),
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
