import axios from "axios";
import config from "../config/config"
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'


const request = axios.create({
    timeout: 10000,
    baseURL: config.baseUrl,
});
// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        const data = error.response.data;
        // 从 localstorage 获取 token
        const token = storage.get("authorization");
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: '授权验证失败'
            })
            if (token) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                })
            }
        }
    }
    return Promise.reject(error)
};

// 请求注入器
request.interceptors.request.use(config => {
    const token = storage.get("authorization");
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
        config.headers["authorization"] = token
    }
    return config
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
    return response.data
}, errorHandler);

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, request)
    }
};

export default request;

export {
    installer as VueAxios,
    request as axios
};