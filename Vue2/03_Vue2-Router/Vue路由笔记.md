# export default表示默认输出值，可理解为new Vue

## 1、vue生命周期可以分为八个阶段，分别是：

<figure>

	beforeCreate   （创建前）
	created        （创建后）
	beforeMount    （载入前）
	mounted        （载入后）
	beforeUpdate   （更新前）
	updated        （更新后）
	beforeDestroy  （销毁前）
	destroyed      （销毁后）

</figure>

## 2.vue生命周期的作用是什么

<figure>

    它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑

</figure>

## 3.第一次页面加载会触发哪几个钩子

<figure>

    第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

</figure>

## 4.简述每个周期具体适合哪些场景

<figure>

    beforeCreate : 可以在这加个loading事件，在加载实例时触发
    created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用
    mounted : 挂载元素，获取到DOM节点
    updated : 如果对数据统一处理，在这里写上相应函数
    beforeDestroy : 可以做一个确认停止事件的确认框
    nextTick : 更新数据后立即操作dom

</figure>

## 5.created和mounted的区别

<figure>

    created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

</figure>

## 6、路由模式

<figure>

    vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载
               http://localhost:8080/#/Hello

    如果不想要很丑的 hash，可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面

              const router = new VueRouter451({
                 mode: 'history',
                 routes: [...]
              })
    　　       当使用 history 模式时，URL 就像正常的 url

               http://localhost:8080/Hello

</figure>

## 7、Vue router 如何传参

<figure>

     params、query 是什么？
        params：/router1/:id，这里的 id 叫做 params。例如/router1/123, /router1/789
        query：/router1?id=123，这里的 id 叫做 query。例如/router1?id=456

</figure>

## 8、注意Vue中的一些单词

<figure>

     component：是注册全局组件，在实例化VUE前调用，注册后可以全局使用
     components：是局部注册组件，注册后只能在当页调用。
     $route：是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
     $router：是“路由实例”对象包括了路由的跳转方法，钩子函数等。

</figure>