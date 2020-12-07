import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login'),
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('@/views/login/forgot'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register'),
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home/home'),
      },
    ],
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/about-us/about-us'),
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
