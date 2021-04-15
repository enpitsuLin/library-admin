import { homeLayout, BasicLayout } from '@/layouts'

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
};
/**
 * 根据权限选择的异步路由
 * @type {Array}
 */
export const asyncRouterMap = [
    //
    {
        path: '/',
        name: 'System',
        redirect: '/home',
        component: BasicLayout,
        meta: { title: '首页' },
        children: [
            // 一级菜单
            {
                path: '/workplace',
                name: 'Workplace',
                component: () =>
                    import ('@/views/home/Home'),
                meta: { title: '工作台', icon: 'home' }
            },
            {
                path: '/analysis',
                name: 'analysis',
                meta: { title: '分析页', icon: 'dashboard' }
            },
            {
                path: '/book-manage',
                name: 'BookManage',
                component: RouteView,
                redirect: "/book-manage/category",
                meta: { title: '图书管理', icon: 'book' },
                children: [{
                        path: '/book-manage/category',
                        name: 'BookCategory',
                        meta: { title: '类别管理', keepAlive: true },

                        component: () =>
                            import ('@/views/book_manage/category')
                    },
                    {
                        path: '/book-manage/info',
                        name: 'BookInfo',
                        meta: { title: '图书信息', keepAlive: true },
                        component: () =>
                            import ('@/views/book_manage/info')
                    }
                ]
            },
            {
                path: '/borrow-manage',
                name: 'BorrwManage',
                component: RouteView,
                redirect: "/borrow-manage/borrow",
                meta: { title: '借阅管理', icon: 'database' },
                children: [{
                        path: '/borrow-manage/borrow',
                        name: 'BookBorrow',
                        meta: { title: '图书借阅', keepAlive: true },
                        component: () =>
                            import ('@/views/borrow_manage/borrow')
                    },
                    {
                        path: '/borrow-manage/renew',
                        name: 'BookRenew',
                        meta: { title: '图书续借', keepAlive: true },
                        component: () =>
                            import ('@/views/borrow_manage/renew')
                    },
                    {
                        path: '/borrow-manage/revert',
                        name: 'BookRevert',
                        meta: { title: '图书归还', keepAlive: true },
                        component: () =>
                            import ('@/views/borrow_manage/revert')
                    }
                ]
            },
            {
                path: '/system-manage',
                name: 'SystemMange',
                component: RouteView,
                redirect: '/system-mange/role',
                meta: { title: '系统管理', icon: 'setting' },
                children: [{
                        path: '/system-mange/role',
                        name: 'RoleManage',
                        meta: { title: '角色管理', keepAlive: true },
                        component: () =>
                            import ('@/views/system_manage/role')
                    },
                    {
                        path: '/system-manage/user',
                        name: 'UserManege',
                        meta: { title: '用户管理', keepAlive: true },
                        component: () =>
                            import ('@/views/system_manage/user')
                    }
                ]
            },
            {
                path: '/account',
                component: RouteView,
                redirect: '/account/center',
                name: 'Account',
                meta: { title: '个人页', icon: 'user', keepAlive: true },
                children: [{
                    path: '/account/settings',
                    name: 'Settings',
                    component: () =>
                        import ('@/views/account/settings/Index'),
                    meta: { title: '个人设置', hideHeader: true },
                    redirect: '/account/settings/base',
                    hideChildrenInMenu: true,
                    children: [{
                            path: '/account/settings/base',
                            name: 'BaseSettings',
                            component: () =>
                                import ('@/views/account/settings/BaseSetting'),
                            meta: { title: '基础设置', hidden: true, keepAlive: true }
                        },

                        {
                            path: '/account/settings/security',
                            name: 'SecuritySettings',
                            component: () =>
                                import ('@/views/account/settings/Security'),
                            meta: { title: '安全设置', hidden: true, keepAlive: true }
                        }
                    ]
                }]
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
export const constantRouterMap = [{
        path: '/home',
        name: 'Home',
        component: homeLayout,
        redirect: '/home/',
        children: [
            //首页-搜索页
            {
                path: '/',
                name: 'HomeIndex',
                component: () =>
                    import ('@/views/home/Home')
            },
            {
                path: '/login',
                name: 'Login',
                component: () =>
                    import ('@/views/user/Login')
            }
        ]
    },
    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "fail" */ '@/views/exception/404')
    }
]