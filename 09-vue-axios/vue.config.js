const { defineConfig } = require('@vue/cli-service')

/**
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

// let proxyObj = {}
// proxyObj['/home', '/api'] = {
//   // WebSocked 设置为false
//   ws: false,
//   target: 'http://192.168.0.111:8080',
//   // 解决跨域
//   changeOrigin: true,
//   // http://loaclhost:8081/123   ===>   http://loaclhost:8080/api/123
//   pathRewrite: {'^/home': '/api'}
// }

/*module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 请求体中添加自定义标头
    headers: {
      'X-Custom-Ming': "bard"
    },
    // 设置IP地址和端口号
    host: 'localhost',
    port: 8081,
    // 写法一
    proxy: {
      // http://loaclhost:8081/user   ===>   http://localhost:8080/user
      context: ['/home'],
      target: 'http://localhost:8080',
      // '/home': 'http://localhost:8080',  // 同上述写法意义相同
      // 解决跨域
      changeOrigin: true,
      // http://loaclhost:8081/123   ===>   http://loaclhost:8080/api/123
      pathRewrite: {'^/home': '/api'}
    },
    // 写法二
    // proxy: proxyObj
  }
})*/
// 跨域配置
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8081, // 端口
    proxy: {
      '/home': {  //   若请求的前缀不是这个'/api'，那请求就不会走代理服务器
        target: 'http://192.168.0.111:8080',  //这里写路径
        pathRewrite:{'^/home':'/api/user'}, //将所有含/api路径的，去掉/api转发给服务器
        ws: false,  //用于支持websocket
        changeOrigin: true   //用于控制请求头中的host值
      },
    }
  }
})



