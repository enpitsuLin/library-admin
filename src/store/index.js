import Vue from 'vue'
import Vuex from 'vuex'


import app from './modules/app'
import user from './modules/user'
// 默认权限控制
import permission from './modules/permission'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        app,
        permission
    },
    getters
})