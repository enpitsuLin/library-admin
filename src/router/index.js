import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from './routes'
import { createGuard } from './guard'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: constantRouterMap.concat(asyncRouterMap)
})

createGuard(router)

export default router