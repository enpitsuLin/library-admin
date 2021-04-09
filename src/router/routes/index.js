import { homeLayout, BasicLayout } from '@/layouts'

const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
}
/**
 * 根据权限选择的异步路由
 * @type {Array}
 */
export const asyncRouterMap = [
    //
    {
        path: '/',
        name: "System",
        redirect: "/home",
        component: BasicLayout,
        meta: { title: 'menu.home' },
        children: [
            // 一级菜单
            {
                path: '/menuhome',
                name: 'Menuhome',
                component: () =>
                    import('@/views/home/Home'),
                meta: { title: '主页', icon: 'home' }
            },
            {
                path: '/dashboard',
                name: "Dashboard",
                redirect: '/dashboard/workplace',
                component: RouteView,
                meta: { title: '仪表板', keepAlive: true, icon: 'desktop' },
                children: [
                    // 二级菜单
                    {
                        path: '/dashboard/workplace',
                        name: 'Workplace',
                        component: () =>
                            import('@/views/home/Home'),
                        meta: { title: '工作台', keepAlive: false }
                    },

                ]
            },
            {
                path: '/account',
                component: RouteView,
                redirect: '/account/center',
                name: 'Account',
                meta: { title: '个人页', icon: 'user', keepAlive: true },
                children: [
                    {
                        path: '/account/settings',
                        name: 'Settings',
                        component: () =>
                            import('@/views/account/settings/Index'),
                        meta: { title: '个人设置', hideHeader: true },
                        redirect: '/account/settings/base',
                        hideChildrenInMenu: true,
                        children: [{
                            path: '/account/settings/base',
                            name: 'BaseSettings',
                            component: () =>
                                import('@/views/account/settings/BaseSetting'),
                            meta: { title: '基础设置', hidden: true, keepAlive: true }
                        },

                        {
                            path: '/account/settings/security',
                            name: 'SecuritySettings',
                            component: () =>
                                import('@/views/account/settings/Security'),
                            meta: { title: '安全设置', hidden: true, keepAlive: true }
                        },
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type {Array}
 */
export const constantRouterMap = [
    {
        path: '/home',
        name: 'Home',
        component: homeLayout,
        redirect: "/home/",
        children: [
            //首页-搜索页
            {
                path: '/',
                name: "HomeIndex",
                component: () =>
                    import('@/views/home/Home')
            },
            {
                path: '/login',
                name: "Login",
                component: () =>
                    import('@/views/user/Login')
            }
        ]
    },
    {
        path: '/404',
        component: () =>
            import( /* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]