import axios from 'axios';
import {ElMessage} from 'element-plus';
import router from '../router'

// 响应拦截器
axios.interceptors.response.use(response => {
    // 业务逻辑错误
    if (response.status === 200) {
        if (response.data.code === 110 || response.data.code === 111 || response.data.code === 401 || response.data.code === 402 || response.data.code === 403 || response.data.code === 404) {
            ElMessage.error(response.data.message);
        } else if (response.data.message) {
            ElMessage.success(response.data.message);
        }
    } else if (response.status === 401) {
        ElMessage.error(response.data.message);
        return Promise.resolve(response); // 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
    } else if (response.status === 407) {
        ElMessage.error(response.data.message);
        router.replace('/');
    }
    return response;
    // return Promise.resolve(response);
}, error => {
    if (error.response.code === 504 || error.response.code === 404) {
        ElMessage.error('服务器被吃了╮(╯▽╰)╭');
    } else if (error.response.code === 403) {
        ElMessage.error('权限不足，请联系管理员！');
    } else if (error.response.code === 401) {
        ElMessage.error('尚未登陆，请登录！');
        router.replace('/');
    } else {
        if (error.response.data.message) {
            ElMessage.error(error.response.data.message)
        } else {
            ElMessage.error('未知错误！')
        }
    }
})


// 传送json格式的post请求
export const postRequired = (url, params, token) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            // 把token放到请求头才能请求，这里的'Bearer '表示是后台希望更加的安全，依据后台给的信息看到底是加还是不加
            'Authorization': /*'Bearer ' +*/ token,
        }
    })
}



