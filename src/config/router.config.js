import { UserLayout, DashboardLayout } from '@/layouts'


const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
}
export const asyncRouterMap = [{
        path: '/',
        name: 'index',
        component: DashboardLayout,
        meta: { title: 'menu.home' },
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/workplace',
                component: RouteView,
                meta: { title: 'menu.dashboard', keepAlive: true, icon: 'appstore' },
                children: [{
                        path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
                        name: 'Analysis',
                        component: () =>
                            import ('@/views/dashboard/Analysis'),
                        meta: { title: 'menu.dashboard.analysis', keepAlive: false }
                    },
                    // 外部链接
                    {
                        path: 'https://www.baidu.com/',
                        name: 'Monitor',
                        meta: { title: 'menu.dashboard.monitor', target: '_blank' }
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'Workplace',
                        component: () =>
                            import ('@/views/dashboard/Workplace'),
                        meta: { title: 'menu.dashboard.workplace', keepAlive: true }
                    }
                ]
            },
            // 管理菜单
            {
                path: '/management',
                name: 'management',
                component: RouteView,
                meta: { title: 'menu.management', keepAlive: true, icon: 'table' },
                children: [{
                        path: 'managerment/book',
                        name: 'Book',
                        meta: { title: 'menu.management.book', keepAlive: true },
                        children: []
                    },
                    {
                        path: 'managerment/user',
                        name: 'User',
                        meta: { title: 'menu.management.user', keepAlive: true },
                        children: []

                    }
                ]
            },
            {
                path: '/staff',
                name: 'staff',
                component: RouteView,
                meta: { title: 'menu.staff', keepAlive: true, icon: 'user' },
                children: []
            },
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
 * @type { *[] }
 */
export const constantRouterMap = [{
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [{
                path: 'login',
                name: 'login',
                component: () =>
                    import ('@/views/user/Login')
            },
            /* {
                path: 'register',
                name: 'register',
                component: () =>
                    import ('@/views/user/Register')
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () =>
                    import ('@/views/user/RegisterResult')
            },
            {
                path: 'recover',
                name: 'recover',
                component: undefined
            } */
        ]
    },

    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]