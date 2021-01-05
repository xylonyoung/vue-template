import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/agreement',
    component: () => import('@/views/agreement/agreement')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/home')
      }
    ]
  },
  {
    path: '',
    component: () => import('@/views/account/account'),
    children: [
      {
        path: '/account/login',
        name: 'Login',
        component: () => import('@/views/account/login')
      },
      {
        path: '/account/register',
        name: 'Register',
        component: () => import('@/views/account/register')
      },
      {
        path: '/account/forgot',
        name: 'Forgot',
        component: () => import('@/views/account/forgot')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('@/views/user/user'),
        children: [
          {
            path: '/user/reservation',
            name: 'Reservation',
            component: () => import('@/views/user/menu/reservation')
          },
          {
            path: '/user/consignment',
            name: 'Consignment',
            component: () => import('@/views/user/menu/consignment')
          },
          {
            path: '/user/packages',
            name: 'Packages',
            component: () => import('@/views/user/menu/packages')
          },
          {
            path: '/user/orders',
            name: 'Orders',
            component: () => import('@/views/user/menu/orders')
          },
          {
            path: '/user/warehouse',
            name: 'Warehouse',
            component: () => import('@/views/user/menu/warehouse')
          },
          {
            path: '/user/address',
            name: 'Address',
            component: () => import('@/views/user/menu/address')
          },
          {
            path: '/user/cash-on-delivery',
            name: 'CashOnDelivery',
            component: () => import('@/views/user/menu/cash-on-delivery')
          },
          {
            path: '/user/bonus',
            name: 'Bonus',
            component: () => import('@/views/user/menu/bonus')
          },
          {
            path: '/user/transaction',
            name: 'Transaction',
            component: () => import('@/views/user/menu/transaction')
          },
          {
            path: '/user/settings',
            name: 'Settings',
            component: () => import('@/views/user/menu/settings')
          },
          {
            path: '/user/password',
            name: 'Password',
            component: () => import('@/views/user/components/password')
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
