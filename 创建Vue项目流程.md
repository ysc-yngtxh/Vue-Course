## 前置知识点
<figure>
<h3>

   1、JavaScript 模块化
      <figure style="line-height: 1.2">
          JavaScript 模块化是指将代码分割成独立的模块，每个模块可以单独编写、测试和维护。模块化有助于提高代码的可读性、可维护性和复用性。
          在 Vue 项目中，通常使用 ES6 的 import/export 语法来实现模块化。
      </figure>
   2、TypeScript参考：https://typescript.p6p.net/typescript-tutorial/module.html 
      <figure style="line-height: 1.2">
         TypeScript 是 JavaScript 的超集，提供静态类型检查和其他功能。它可以帮助开发者在编写代码时捕获错误，并提供更好的代码提示和自动补全。<br/>
         TypeScript 代码会被编译成 JavaScript 代码，以便在浏览器或 Node.js 环境中运行。<br/>
         注意：TypeScript 是可选的，可以选择不使用 TypeScript，而是使用纯 JavaScript 编写 Vue 项目。
      </figure>
   3、Vue的`<style scoped>`表示什么意思？
      <figure style="line-height: 1.2">
         `<style scoped>` 是 Vue 单文件组件中的一个特性，用于限制样式的作用范围。它确保样式只应用于当前组件，而不会影响全局或其他组件。
         这通过为每个元素添加一个唯一的属性（如 data-v-xxxx）来实现，从而避免样式冲突。
         注意：如果使用了 `<style scoped>`，则不能在该样式中使用全局选择器（如 *、:global 等）。
      </figure>
   4、Vue的`<script type="module">`表示什么意思？
   <figure style="line-height: 1.2">
       是浏览器原生支持的 JavaScript 模块化方案。允许在浏览器中使用 import 和 export 语法，实现代码的模块化拆分和复用。

   ```vue
   <script type="module">
     import { func } from './module.js'; // 导入其他模块
     export const value = 42;            // 导出当前模块
   </script>
   ```
   </figure>
   5、Babel 是一个 JavaScript 编译器，主要功能：将新版 JavaScript（如 ES6+/TypeScript）转换为旧版（如 ES5），确保兼容老旧浏览器。<br/><br/>
   6、ESLint 是一个用于 JavaScript/TypeScript 代码静态分析 的工具，主要用于 检查代码错误、统一代码风格 以及 强制执行最佳实践。<br/><br/>
   7、JSX是什么?
</h3>
</figure>

## 一、传统开发中存在的问题
<figure>

    1、传统开发中，一个html文件可能会引用多个js或css文件，需要手动引入 <script> 或 <link> 标签。标签的顺序还不能乱，因为它们可能存在依赖关系。
       因此就很容易导致加载顺序错误、冗余或遗漏的问题。
    2、未优化的前端资源（如未压缩的代码、未合并的文件）会导致加载慢、重复请求。
    3、传统工具难以将 CSS、图片、字体等非 JS 资源视为模块管理。
</figure>

## 二、构建工具（Webpack、Vite......等工具用以解决传统开发中存在的痛点）
<figure>

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
</figure>

## 三、创建Vue项目
<figure>
  <h4>

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
   ![create-vite](Vue3/01_Vue3-Base/gif/create-vite.gif)<hr/>

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
  ![create-vue](Vue3/01_Vue3-Base/gif/create-vue.gif)<hr/>

  3、使用 @vue/cli（基于Webpack的脚手架）创建Vue项目。<br/>
     <figure>
         前提：需要安装Node.js和npm，以及全局安装@vue/cli。
     </figure>
   ```bash
   # 安装 Vue CLI
   npm install -g @vue/cli
   # 创建 Vue2/3 项目。该命令下会出现交互式命令行界面，提示你选择项目配置，支持 Vue2 和 Vue3。
   vue create vue-project
   ```
  <figure>

   ①、选择项目配置
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: 
     Default ([Vue 3] babel, eslint)  # 默认预设，使用 Vue 3、Babel 和 ESLint
     Default ([Vue 2] babel, eslint)  # 默认预设，使用 Vue 2、Babel 和 ESLint
   ❯ Manually select features         # 手动选择功能【自定义选择Vue版本以及各依赖】
   ```
   ②、手动选择功能依赖
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
    ◉ Babel                              # Babel 是一个JavaScript编译器，主要功能是将新版本的 JavaScript 代码转换为旧版本，以确保兼容性（ES6转ES5）
    ◯ TypeScript                         # TypeScript 是 JavaScript 的超集，提供静态类型检查和其他功能。
    ◉ Progressive Web App (PWA) Support  # 渐进式 Web 应用支持。这是一种通过现代 Web 技术构建的应用程序，它能提供接近原生应用的用户体验，同时保留 Web 应用的灵活性和可访问性。简单来说，PWA 是网页和手机应用的混合体，兼具两者的优势。
    ◉ Router                             # Vue Router 是 Vue.js 的官方路由管理器
    ◯ Vuex                               # Vuex 是 Vue.js 的官方状态管理库
    ◉ CSS Pre-processors                 # CSS 预处理器，如 Sass、Less 等
   ❯◉ Linter / Formatter                 # 代码风格检查和格式化工具
    ◯ Unit Testing                       # 单元测试
    ◯ E2E Testing                        # 端到端测试
   ```
   ③、选择 Vue 版本（这里选择的是Vue2）
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 
     3.x    # Vue 3.x 版本
   ❯ 2.x    # Vue 2.x 版本
   ```
   ④、选择 Vue Router 的 路由模式（是否使用history模式？）<br/>
      <figure style="line-height: 1.2;">
       注意：如果选择了 history 模式，则需要后端服务器支持，否则会出现 404 错误。<br/>
       如果不确定是否需要 history 模式，可以选择 No（即:n），这样会使用 hash 模式。<br/>
       hash 模式不需要后端服务器支持，兼容性更好，适合 Demo 项目。
       </figure>
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 2.x
   ? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) 
   ```
   ⑤、选择 CSS 预处理器
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 2.x
   ? Use history mode for router? (Requires proper server setup for index fallback in production) No
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
   ❯ Sass/SCSS (with dart-sass)  # CSS预处理器选择 Sass/SCSS（推荐）
     Less                        # CSS预处理器选择 Less
     Stylus                      # CSS预处理器选择 Stylus
   ```
   ⑥、选择 ESLint 代码风格检查和格式化工具
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 2.x
   ? Use history mode for router? (Requires proper server setup for index fallback in production) No
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
   ? Pick a linter / formatter config: (Use arrow keys)
   ❯ ESLint with error prevention only  # 只进行报错提醒
     ESLint + Airbnb config             # 不严谨模式
     ESLint + Standard config           # 正常模式
     ESLint + Prettier                  # 严格模式
   ```
   ⑦、选择 ESLint 的语法检查时机
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 2.x
   ? Use history mode for router? (Requires proper server setup for index fallback in production) No
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
   ? Pick a linter / formatter config: Basic
   ? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
   ❯◉ Lint on save            # 保存时检测
    ◯ Lint and fix on commit  # 修复和提交时检测
   ```
   ⑧、配置文件的存放位置，比如Babel、PostCSS、ESLint等配置（推荐独立放置配置文件）
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 2.x
   ? Use history mode for router? (Requires proper server setup for index fallback in production) No
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
   ? Pick a linter / formatter config: Basic
   ? Pick additional lint features: Lint on save
   ? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
   ❯ In dedicated config files  # 放独立文件放置
     In package.json            # 放在 package.json 中
   ```
   ⑨、是否将这次已选项保存为一个将来可复用的 preset（预设）？(选择yes的话下次就可以不用进行配置)
   ```bash
   Vue CLI v5.0.8
   ? Please pick a preset: Manually select features
   ? Check the features needed for your project: Babel, PWA, Router, CSS Pre-processors, Linter
   ? Choose a version of Vue.js that you want to start the project with 2.x
   ? Use history mode for router? (Requires proper server setup for index fallback in production) No
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
   ? Pick a linter / formatter config: Basic
   ? Pick additional lint features: Lint on save
   ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
   ? Save this as a preset for future projects? (y/N) 
   ```
  </figure>
  <hr/>

  4、总结
     <figure>
         - 推荐使用 Vite 创建 Vue3 项目，速度更快，体验更好。<br/>
         - 使用 npm create vue@latest 创建 Vue3 项目是官方推荐的方式。<br/>
         - 使用 vue@cli 创建 Vue2/3 项目是传统方式，但不推荐新项目使用。
     </figure>
  </h4>
</figure>


## 四、扩展知识点
<figure>
  <h4>

    1、添加依赖：npm install <package-name> --save
         例如：npm install axios --save
         注意：--save 是默认行为，可以省略。
    2、安装开发依赖：npm install <package-name> --save-dev
         例如：npm install eslint --save-dev
         注意：--save-dev 用于安装开发环境依赖，不会被打包到生产环境中。
    3、安装全局依赖：npm install <package-name> -g
         例如：npm install @vue/cli -g
         注意：-g 表示全局安装，适用于命令行工具。全局安装的包可以在任何地方使用，不需要在项目中单独安装。
    4、卸载依赖：npm uninstall <package-name>
         例如：npm uninstall axios
    5、更新依赖：npm update <package-name>
         例如：npm update axios
    6、查看已安装的依赖：npm list --depth=0
         例如：npm list --depth=0
         注意：--depth=0 表示只显示顶层依赖，不显示子依赖。
    7、查看全局已安装的依赖：npm list -g --depth=0
         例如：npm list -g --depth=0
    8、查看依赖的版本：npm view <package-name> version
         例如：npm view axios version
    9、查看依赖的所有信息：npm view <package-name>
         例如：npm view axios
    10、查看当前项目的依赖信息：npm ls
         例如：npm ls
    11、查看当前项目的依赖树：npm ls --all
         例如：npm ls --all
    12、使用脚手架添加依赖
         vue add <package-name>

  </h4>
</figure>