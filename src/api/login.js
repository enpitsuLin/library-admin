import request from '@/utils/request'

const userApi = {
    Login: 'admin/login',
}


export function login(parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}