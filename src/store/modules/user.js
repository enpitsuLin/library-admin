import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        info: {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const result = response.result
                    storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
                    commit('SET_TOKEN', result.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const result = response.result
                    commit('SET_INFO', result)
                    commit('SET_NAME', { name: result.name, welcome: welcome() })
                    commit('SET_AVATAR', result.avatar)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    storage.remove(ACCESS_TOKEN)
                    resolve()
                }).catch(() => {
                    resolve()
                }).finally(() => {})
            })
        }

    }
}

export default user