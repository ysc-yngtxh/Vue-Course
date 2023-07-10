import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from '@/router'

axios.interceptors.response.use(resp => {
    if (resp.data.code === 200) {
        ElMessage.success("请求成功！！！")
    } else {
        ElMessage.info(resp.data.message)
    }
    return resp;
}, error => {
    if (error.status === 500 || error.status === 504) {
        ElMessage.error("服务器被吃掉了╮(╯▽╰)╭")
    } else if (error.status === 403) {
        ElMessage.error("权限不足，请联系管理员")
    } else if (error.status === 401) {
        ElMessage.error("未登录，请重新登录")
        router.replace('/')
    } else {
        ElMessage.error("未知错误")
    }
})

export const postRequired = (url, params, token) => {
    return axios({
        baseURL: "/home",   // 调用该请求方法时，加在请求路径前的的前缀
        method: 'post',
        url: `${url}`,
        data: params,
        headers: {
            'Context-type': "application/json;charset=utf-8",
            // Token
            'Authorization': token
        }
    })
}