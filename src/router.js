import VueRouter from "vue-router";

const router = new VueRouter({
    routes:
        [
            {
                path: '/404',
                name: 'notFoundPage',
                component: notFound
            },
            {
                path: '*',
                redirect: '/404'
            },
            {
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/',
                redirect: '/home',
                component: viewPage,
            }
        ],
})
//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
    NProgress.done().start()
    let toName = to.name
    let is_login = store.state.user_info.login

    if (is_login && toName != 'login') {
        next('/login')
    } else {
        if (is_login && toName === 'login') {
            next('/')
        } else {
            next()
        }
    }
})
//路由完成之后的操作
router.afterEach(route => {
    NProgress.done()
  })
  
export default router