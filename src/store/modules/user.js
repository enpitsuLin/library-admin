import storage from 'store'
import {
    login,
    logout,
    validate
} from '@/api/user';
// import { welcome } from '@/utils/util'

const user = {
    state: {
        token: '',
        name: '',
        role: '',
        avatar: ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        }
    },

    actions: {
        // 登录
        Login({
            commit
        }, {
            username,
            password
        }) {
            return new Promise((resolve, reject) => {
                login({
                        username,
                        password
                    })
                    .then(res => {
                        const result = res.data
                        storage.set('authorization', result.token, 7 * 24 * 60 * 60 * 1000)
                        commit('SET_TOKEN', result.token)
                        commit('SET_NAME', result.name)
                        commit('SET_AVATAR', result.avatar)
                        resolve(res.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 登出
        Logout({
            commit,
            state
        }) {
            return new Promise(resolve => {
                logout(state.token)
                    .then(() => {
                        commit('SET_TOKEN', '')
                        storage.remove('authorization')
                        resolve()
                    })
                    .catch(() => {
                        // 登出无视任何借口情况
                        commit('SET_TOKEN', '')
                        storage.remove('authorization')
                        resolve()
                    })
                    .finally(() => {})
            })
        },
        // 校验
        Validate({
            commit
        }) {
            return new Promise((resolve, reject) => {
                validate()
                    .then(res => {
                        const result = res.data
                        storage.set('authorization', result.token, 7 * 24 * 60 * 60 * 1000)
                        commit('SET_TOKEN', result.token)
                        commit('SET_NAME', result.name)
                        commit('SET_AVATAR', result.avatar)
                        resolve(res.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },
    getters: {
        isLogin(state) {
            return state.token != ''
        },
        CurrentUser(state) {
            let avatarsrc = state.avatar == '' || state.avatar == undefined ? '/uploads/avatar/defualt' : `/uploads/avatar/${state.avatar}`
            return {
                name: state.name,
                avatar: avatarsrc,
                role: state.role
            }
        }
    }
}

export default user