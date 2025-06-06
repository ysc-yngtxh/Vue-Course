

  以前我们去定义一个局部变量是：var i = [1,2,3]
  但是我们会发现，这个变量在全局中还是会起到作用。所以网络编程发展到今天，已经做出了改变。
  现在的定义局部变量：let i
  声明的变量不能被修改：const k ---- 相当于Java里的final

  解构表达式：
     let arr = [2, 5, -10, 7]
     let [a, b] = arr   ===> a = 2, b = 5
     let [, , c, d] = arr ===> c = -10, d = 7
     let [, ...rest] = arr  ===> rest = [5, -10, 7]    // ...rest表示的是剩余的数据

     let p = {name: jack, age: 23}
     let {name, age} = p  ===> name = jack, age = 23
     let {name: n} = p    ===> 表示把name赋值给n,其实就是弄个缩写

     let p = {name: jack, age: 23, girl{name: rosin, age: 22}}
     let {girl: {name}} = p ===> girl:表示要赋值给后面的变量，但是我写的都是{name}。就是说我从这个赋值的变量中取出name值
     let {...obj} = p   ===>对象的拷贝复制：obj = {name: jack, age: 23, girl{name: rosin, age: 22}}

  箭头函数
     const add = (a, b) => a+b   表达的是求和

  函数优化
     const p = {
         name: "jack",
         age: 21
     }
     const hello = function({name, age}){
         console.log(name, age);
     }

     还可以这么写  const hello = ({name, age}) => console.log(name, age);

     hello(p);

   map和reduce
      let arr = ['2', '5', '7', '-8', '-6'];
      let arr2 = arr.map(s => parseInt(s));   ===>   arr2 = [2, 5, 7, -8, -6]
      arr2.reduce((a,b) => a+b)    ===> 相当于a = 2,b = 5,进行a+b操作即2+5=7，再将7做为a，进行后续的加法
      arr2.reduce((a,b) => a*b, 0)  ===> 结果为0
