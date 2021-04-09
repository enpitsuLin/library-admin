import request from '@/utils/request'


export function login(param) {
    return request({
        url: '/user/login',
        method: 'post',
        data: param
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function validate() {
    return request({
        url: '/user/validate',
        method: 'post',
    })
}