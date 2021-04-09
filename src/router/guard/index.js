import store from '../../store'
import storage from 'store'
import NProgress from 'nprogress' // 进度条样式
import '@/components/NProgress/nprogress.less' //


const allowList = ["Home", "Login", "HomeIndex"]
const loginPath = '/login'
const defaultRoutePath = '/home'

export function createGuard(router) {
    NProgress.configure({ showSpinner: false });
    router.beforeEach((to, from, next) => {
        NProgress.start();
        // 是否有token信息
        console.log("beforeEach", allowList.includes(to.name), to);

        // 拥有jwt信息 则检验
        if (storage.get("authorization")) {
            if (to.path === loginPath) {
                next({ path: defaultRoutePath });
                NProgress.done()
            } else {
                // 校验token
                store.dispatch('Validate').then((ret) => {
                    console.log(ret)
                    next()
                }).catch((err) => {
                    console.log(err);
                    this.$notification("用户验证过期,返回登录");
                    next({ path: loginPath, query: { redirect: to.fullPath } });
                })
            }
        } else {
            console.log("has no Json web token");
            if (allowList.includes(to.name)) {
                //免登名单
                next();
            } else {
                next({ path: loginPath, query: { redirect: to.fullPath } });
            }

        }

    });

    router.afterEach(() => {
        NProgress.done()
    });
}