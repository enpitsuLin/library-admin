import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import './components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
        /* has token */
    if (storage.get(ACCESS_TOKEN)) {
        if (to.path === loginRoutePath) {
            next({ path: defaultRoutePath });
            NProgress.done()
        } else {
            // 如果当前store没有用户信息
            if (Object.keys(store.getters.userInfo).length === 0) {
                // 请求用户信息
                store
                    .dispatch('GetInfo').then(() => {
                        next()
                    })
                    .catch(() => {
                        notification.error({
                                message: '错误',
                                description: '请求用户信息失败，请重新登录'
                            })
                            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
                        store.dispatch('Logout').then(() => {
                            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
                        })
                    })
            } else {
                next()
            }

        }
    } else {
        if (allowList.includes(to.name)) {
            // 在免登录名单，直接进入
            next()
        } else {
            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})