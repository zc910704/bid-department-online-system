import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // enterance of the overview
  {
    path: '/overview',
    component: Layout,
    hidden: false,
    children: [{
      path: 'index',
      name: 'Overview',
      component: () => import('../views/overview/index'),
      meta: { title: '投标总览', icon: 'eye' }
    }]
  },

  {
    path: '/detail',
    component: Layout,
    hidden: false,
    children: [{
      path: 'index',
      name: 'detail',
      component: () => import('../views/detail/index'),
      meta: { title: '投标详情', icon: 'example' }
    }]
  },

  {
    path: '/add',
    component: Layout,
    hidden: false,
    children: [{
      path: 'index',
      name: 'add',
      component: () => import('../views/add/index'),
      meta: { title: '录入信息', icon: 'form' }
    }]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.github.com',
        meta: { title: '外链', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
