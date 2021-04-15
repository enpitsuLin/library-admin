import store from '../../store'
import storage from 'store'
import NProgress from 'nprogress' // 进度条样式
import notification from 'ant-design-vue/es/notification'
import '@/components/NProgress/nprogress.less' //


const allowList = ["Home", "Login", "HomeIndex"]
const loginPath = '/login'
const defaultRoutePath = '/home'

export function createGuard(router) {
    NProgress.configure({
        showSpinner: false
    });
    router.beforeEach((to, from, next) => {
        NProgress.start();
        // 是否有token信息
        // console.log("beforeEach", allowList.includes(to.name), to);

        // 拥有jwt信息 则检验
        if (storage.get("authorization")) {
            if (to.path === loginPath) {
                next({
                    path: defaultRoutePath
                });
                NProgress.done()
            } else {
                // 校验token Unauthorized处理在路由守卫
                store.dispatch('Validate').then((ret) => {
                    next()
                })
            }
        } else {
            console.log("has no Json web token");
            if (allowList.includes(to.name)) {
                //免登名单
                next();
            } else {
                next({
                    path: loginPath,
                    query: {
                        redirect: to.fullPath
                    }
                });
            }

        }

    });

    router.afterEach(() => {
        NProgress.done()
    });
}