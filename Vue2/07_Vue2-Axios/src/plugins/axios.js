import axios from "axios";
import {Message} from 'element-ui'
import router from '@/router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 响应拦截
_axios.interceptors.response.use(
    resp => {
        if (resp.data.code === 200) {
            Message.success("请求成功！！！")
        } else if (resp.data.data === null) {
            console.log(resp.data);
            Message.info(resp.data.message)
            router.push('/').then(r => r)
        }
        return resp;
    }, error => {
        if (error.status === 500 || error.status === 504) {
            Message.error("服务器被吃掉了╮(╯▽╰)╭")
        } else if (error.status === 403) {
            Message.error("权限不足，请联系管理员")
        } else if (error.status === 401) {
            Message.error("未登录，请重新登录")
            router.replace('/').then(r => r)
        } else {
            Message.error("未知错误")
        }
    }
)

export const postRequired = (url, params, token) => {
    return axios({
        baseURL: "/home",   // 调用该请求方法时，加在请求路径前的的前缀
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Context-type': "application/json;charset=utf-8",
            // Token
            'X-Token': token
        }
    })
}
