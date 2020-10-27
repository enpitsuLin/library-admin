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
                meta: { title: 'menu.dashboard', keepAlive: true, icon: 'desktop' },
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
                        path: '/managerment/book',
                        name: 'Book',
                        component: () =>
                            import ('@/views/management/books/index'),
                        meta: { title: 'menu.management.book', keepAlive: true },
                    },
                    {
                        path: '/managerment/user',
                        name: 'User',
                        component: () =>
                            import ('@/views/management/users/index'),
                        meta: { title: 'menu.management.user', keepAlive: true },
                    }
                ]
            },
            // account
            {
                path: '/account',
                component: RouteView,
                redirect: '/account/center',
                name: 'account',
                meta: { title: 'menu.account', icon: 'user', keepAlive: true },
                children: [
                    /* {
                        path: '/account/center',
                        name: 'center',
                        component: () =>
                            import ('@/views/account/center'),
                        meta: { title: '个人中心', keepAlive: true }
                    }, */
                    {
                        path: '/account/settings',
                        name: 'settings',
                        component: () =>
                            import ('@/views/account/settings/Index'),
                        meta: { title: 'menu.account.profile', hideHeader: true },
                        redirect: '/account/settings/base',
                        hideChildrenInMenu: true,
                        children: [{
                                path: '/account/settings/base',
                                name: 'BaseSettings',
                                component: () =>
                                    import ('@/views/account/settings/BaseSetting'),
                                meta: { title: 'menu.account.profile.base', hidden: true, keepAlive: true }
                            },

                            {
                                path: '/account/settings/security',
                                name: 'SecuritySettings',
                                component: () =>
                                    import ('@/views/account/settings/Security'),
                                meta: { title: 'menu.account.profile.security', hidden: true, keepAlive: true }
                            },
                            /*
                                {
                                path: '/account/settings/custom',
                                name: 'CustomSettings',
                                component: () =>
                                    import ('@/views/account/settings/Custom'),
                                meta: { title: '个性化设置', hidden: true, keepAlive: true }
                            }, 
                            {
                                path: '/account/settings/binding',
                                name: 'BindingSettings',
                                component: () =>
                                    import ('@/views/account/settings/Binding'),
                                meta: { title: '账户绑定', hidden: true, keepAlive: true }
                            },
                            {
                                path: '/account/settings/notification',
                                name: 'NotificationSettings',
                                component: () =>
                                    import ('@/views/account/settings/Notification'),
                                meta: { title: '新消息通知', hidden: true, keepAlive: true }
                            }
                            */
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
        }]
    },

    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]