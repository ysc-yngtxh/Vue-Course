
const {defineConfig} = require('@vue/cli-service')

/*
  cors跨域请求配置文件
      将前端的Ajax请求的请求头设置成代理的目标请求路径
      ①比如有个Ajax请求的url路径是'/captcha'。实际上的完整路径是当前的域：http://localhost:8081
      ②那么跨域请求要访问的是http://localhost:8080。
        所以这个配置文件将请求路径中的域+端口(localhost:8081)交给node.js,
        node.js把请求代理给域+端口(localhost:8080)

  注意：浏览器自己是可以发起跨域请求的（比如a标签、img标签、form表单等），
       但是Javascript是不能去跨域获取资源（如ajax）
       所以这里的验证码完全可以将url写成 http://localhost:8080/captcha?time
       因为我们的验证码是一个img图片形式，相当于跨域嵌入资源，是被浏览器允许的。
*/

// 先定义一个对象，再在这个对象中进行属性设置
let proxyObj = {}

proxyObj['/'] = {
    // webSocket,这个不重要，现在不理解也没事儿
    ws: false,
    //目标地址
    target: 'http://localhost:8080',
    //发送请求头host会被设置target
    changeOrigin: true,
    //不重写请求地址
    pathReWrite: {
        '^/': '/'
    }
}

module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },
    devServer: {
        // baseURL: '/api',
        host: 'localhost',
        port: 8081,
        proxy: proxyObj
    }
})
