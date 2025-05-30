参考TypeScript：https://typescript.p6p.net/typescript-tutorial/module.html

    Vue的<style scoped>表示什么意思？

## 一、传统开发中存在的问题
    1、传统开发中，一个html文件可能会引用多个js或css文件，需要手动通过 <script> 或 <link> 标签管理依赖。标签的顺序还不能乱，因为它们存在依赖关系。
       因此就很容易导致加载顺序错误、冗余或遗漏的问题。
    2、未优化的前端资源（如未压缩的代码、未合并的文件）会导致加载慢、重复请求。
    3、传统工具难以将 CSS、图片、字体等非 JS 资源视为模块管理。

## 二、构建工具（Webpack、Vite......等工具用以解决传统开发中存在的痛点）
    注意，这些工具我们比较习惯称之为构建工具，而不是打包工具，因为打包工具听起来就只是一个简单的打包功能，
    但是构建工具有很多其他的功能，比如编译、测试、打包、优化、压缩等。还是称之为构建工具比较好。
    
    Webpack 是一个基于模块的构建工具，是一个用于 js 应用程序的静态模块打包工具。
    它能够将多个 JavaScript 文件打包成一个或多个文件，以及将各种资源（如样式表、图片等）转换成代码，使得工程中的各种资源能够被打包成一个整体的bundle.js文件。
    Webpack具有很高的可配置性和灵活性，使得开发者可以使用各种插件和配置文件来优化它们的工作流程。
    Webpack适用于大型、复杂的项目，它可以处理多种不同类型的文件（如js、css、图片等），并根据需求进行转换、压缩和打包。
    
    
    Vite是一个快速、轻量级的现代Web开发构建工具，它利用现代浏览器的原生ES模块加载功能，采用按需编译的方式，因此在开发过程中能够获得更快的冷启动速度。
    Vite的开发体验非常好，因为它能够在开发时实时更新页面(vite 的热更新是使用了 websocket 原理)，而不需要对整个项目进行重新构建。
    Vite 集成了 Vue.js，但也可以用于其他框架或库。相比于Webpack的构建过程，Vite的开发速度更快，也更适合小型、简单的项目。
    优点：
         利用 esm, 快速的冷启动
         即时的热更新
         动态导入，按需编译
    缺点：功能不如 webpack 强大
    ```angular2html
    # vite.config.ts
    import { defineConfig } from 'vite' 
    # 导出默认的defineConfig
    export default defineConfig({ server: { port: 3000})
    ```

## 三、创建Vue项目
<figure>
  <h3>

   1、使用 Vite 创建Vue项目。<br/>
      <figure>
          前提：需要安装Node.js和npm。
      </figure>
   ```bash
   # 创建 Vue3 项目【npm create 是 npm init 的 别名（alias），底层实现完全一致】
   npm create vite@latest
   npm create vite@latest vue-project -- --template vue-ts
   # ①、npm create vite@latest：使用 npm 远程拉取 create-vite 包，自动执行包中的 create-vite 脚本，创建一个新的 Vite 项目。。
   # ②、vue-project：自定义的项目文件夹名称。
   # ③、-- --template vue-ts
   #     -- 表示将后续参数传递给 create-vite 命令。
   #     --template vue-ts 指定项目模板为 Vue3 + TypeScript。
   #     --template react-ts 指定项目模板为 React + TypeScript。
   # ④、若省略 -ts（即 --template vue），则创建纯 JavaScript 的 Vue 项目。
   #     npm create vite@latest [vue-project] -- --template vue
   
   # 进入项目目录
   cd vue-project
   # 安装依赖
   npm install
   # 运行项目
   npm run dev
   ```
   ![create-vite](01_Vue3-Base/gif/create-vite.gif)

  2、使用npm 的 create-vue（基于Vite脚手架） 包创建Vue项目【官方推荐】<br/>
     <figure>
         前提：需要安装Node.js和npm。
     </figure>
  ```bash
    # 创建 Vue3 项目【npm create 是 npm init 的 别名（alias），底层实现完全一致】
    npm init vue@latest
    npm init vue@latest vue-project --template ts
    # 该命令通过 npm 从远程拉取最新的 create-vue 包，自动执行包中的 create-vue 脚本，创建一个新的Vue项目（只支持Vue3）
    # 类似的其他工具命令（如 npm init react-app、npm init vite）也是同样的逻辑。
  ```
  ![create-vue](01_Vue3-Base/gif/create-vue.gif)

  3、使用 @vue/cli（基于Webpack的脚手架）创建Vue项目。<br/>
     <figure>
         前提：需要安装Node.js和npm，以及全局安装@vue/cli。
     </figure>
   ```bash
   # 安装 Vue CLI
   npm install -g @vue/cli
   # 创建 Vue2/3 项目
   vue create vue-project
   # 该命令下会出现交互式命令行界面，提示你选择项目配置。支持 Vue2 和 Vue3。
   ```

  4、总结
     - 推荐使用 Vite 创建 Vue3 项目，速度更快，体验更好。
     - 使用 npm create vue@latest 创建 Vue3 项目是官方推荐的方式。
     - 使用 vue@cli 创建 Vue2/3 项目是传统方式，但不推荐新项目使用。

  </h3>
</figure>