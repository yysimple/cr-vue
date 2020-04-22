import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export const userRoutes = [
  {
    path: '/notification-management',
    component: Layout,
    redirect: '/notification-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/notification-management/index.vue'),
        name: 'NotificationManagement',
        meta: { title: '通知管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/order-management',
    component: Layout,
    redirect: '/order-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/order-management/index.vue'),
        name: 'OrderManagement',
        meta: { title: '维修订单管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/computer-info-management',
    component: Layout,
    redirect: '/computer-info-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/computer-info-management/index.vue'),
        name: 'ComputerInfoManagement',
        meta: { title: '电脑信息管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/person-info-management',
    component: Layout,
    redirect: '/person-info-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/person-info-management/index.vue'),
        name: 'PersonInfoManagement',
        meta: { title: '个人信息管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/feedback-management',
    component: Layout,
    redirect: '/feedback-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/feedback-management/index.vue'),
        name: 'FeedbackManagement',
        meta: { title: '留言管理', icon: 'dashboard' }
      }
    ]
  }
]

export const adminRoutes = [
  {
    path: '/user-info-management',
    component: Layout,
    redirect: '/user-info-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-info-management/index.vue'),
        name: 'UserInfoManagement',
        meta: { title: '用户信息', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/computer-info-management',
    component: Layout,
    redirect: '/computer-info-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/computer-info-management/index.vue'),
        name: 'MaintainInfoManagement',
        meta: { title: '电脑信息管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/fault-info-management',
    component: Layout,
    redirect: '/fault-info-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/fault-info-management/index.vue'),
        name: 'FaultInfoManagement',
        meta: { title: '故障信息管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/order-management',
    component: Layout,
    redirect: '/order-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/order-management/index.vue'),
        name: 'OrderManagement',
        meta: { title: '维修订单管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/parts-management',
    component: Layout,
    redirect: '/parts-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/parts-management/index.vue'),
        name: 'PartsManagement',
        meta: { title: '零件管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/visitor-management',
    component: Layout,
    redirect: '/visitor-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/visitor-management/index.vue'),
        name: 'VisitorManagement',
        meta: { title: '访客管理', icon: 'dashboard' }
      }
    ]
  }, {
    path: '/feedback-management',
    component: Layout,
    redirect: '/feedback-management/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/feedback-management/index.vue'),
        name: 'FeedbackManagement',
        meta: { title: '留言回复', icon: 'dashboard' }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...userRoutes,
    ...adminRoutes,
    ...constantRoutes,
    { path: '*', redirect: '/404', hidden: true }
  ]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// 防止手动输入地址进行访问路由
// router.beforeEach((to, from, next) => {
//   // start progress bar
//   NProgress.start()
//
//   const userInfo = window.sessionStorage.getItem('token')
//   if (userInfo) {
//     next()
//     NProgress.done()
//   } else {
//     if (to.path === '/') {
//       next()
//       NProgress.done()
//     } else {
//       next('/')
//       NProgress.done()
//     }
//   }
// })
