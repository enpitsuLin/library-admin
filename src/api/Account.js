import request from '@/utils/request'

const userApi = {
    //User account
    Login: '/users/login',
    UserInfo: '/users/info',
    Register: '/users/register',
    UploadAvatar: '/users/uploadavatar',

    Logout: '/admin/logout',
}

// 用户的接口
export function login(parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}

export function getInfo() {
    return request({
        url: userApi.UserInfo,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function logout() {
    return request({
        url: userApi.Logout,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function uploadAvatar(parameter) {
    return request({
        url: userApi.UploadAvatar,
        method: 'post',
        contentType: false,
        processData: false,
        data: parameter,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}