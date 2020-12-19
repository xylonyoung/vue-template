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
    path: '/agreement',
    component: () => import('@/views/agreement/agreement'),
  },
  {
    path: '/exceptions',
    component: () => import('@/views/exceptions/exceptions'),
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
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'User',
        component: () => import('@/views/user/user'),
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
    path: '/ship',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Ship',
        component: () => import('@/views/ship/ship'),
      },
    ],
  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Product',
        component: () => import('@/views/product/product'),
      },
    ],
  },
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'News',
        component: () => import('@/views/news/news'),
      },
    ],
  },
  {
    path: '/partner',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Partner',
        component: () => import('@/views/partner/partner'),
      },
    ],
  },
  {
    path: '/contact',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'contact',
        component: () => import('@/views/contact/contact'),
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
