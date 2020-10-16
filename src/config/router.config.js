import { UserLayout, DashboardLayout } from '@/layouts'

const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
}



export const asyncRouterMap = [

    {
        path: '/',
        name: 'index',
        component: DashboardLayout,
        //meta:{title:'menu.home'},
        redirect: '/dashboard/workplace',
        children: [
            //dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/workplace',
                component: RouteView,
                children: [

                    {
                        path: '/dashboard/workplace',
                        name: 'Workplace'
                    },
                    {
                        path: 'https://www.baidu.com',
                        name: 'Monitor',
                        meta: { target: '_blank' }
                    }
                ]
            }
        ]
    },

]

export const constantRouterMap = [

    {
        path: '/user',
        component: UserLayout,
        //redirect: '/user/login',
        hidden: true,
        children: [

            {
                path: 'login',
                name: 'login',
                component: () =>
                    import ( /* webpackChunkName: "user" */ '@/views/user/Login')
            },

        ]
    }
]