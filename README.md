# Eris CLI

基于 typescript 的前端脚手架工具，快速创建 React、Vue 应用，模板丰富、功能齐全、开箱即用。

## 🎉 快速开始

* 安装依赖包
```shell
$ npm install 
```
* 软连接到全局
```shell
$ npm link 或者 yarn link
```
* 启动 watch 实时编译
```shell
$ npm run start
```
此时可以在任何位置，开始 eris 命令进入交互式界面

```shell
➜  $ eris

  _______   ________  ___  ________
  |\  ___ \ |\   __  \|\  \|\   ____\
  \ \   __/|\ \  \|\  \ \  \ \  \___|_
   \ \  \_|/_\ \   _  _\ \  \ \_____  \
    \ \  \_|\ \ \  \\  \\ \  \|____|\  \
     \ \_______\ \__\\ _\\ \__\____\_\  \
      \|_______|\|__|\|__|\|__|\_________\
                              \|_________|
  
 ---------- 欢迎使用 Eris 脚手架 ------------ 

? 请选择需要执行的操作 (Use arrow keys)
❯ 创建应用 
  启动应用 
  打包应用 
  删除应用 
  查看帮助 
  退出 


```

* 编译打包
```shell
$ npm run build
```


## 📖 详细使用教程

* help  脚手架使用帮助
```shell
$ eris -h
```

* create 创建应用
```shell
# 从git上获取模板
$ eris create <appid> --app-name <appName> --template <git地址>

# 从本地获取模板，根据命令行提示获取模板
$ eris create <appid> --app-name <appName>

```
* start  启动应用
```shell
$ eris start <appid>

```
* build  打包应用
```shell
$ eris build <appid>
```
* delete_app  删除应用
```shell
# 进入 eris 交互式命令行模式删除应用
$ eris
```



## 📋 开发及维护脚手架模板

模板开发命令：

```
npm run dev-tpl
```

必要约定：

- package.json 的 name 需要填写为 `<%= appId %>`，如： `"name": "<%= appId %>"`
- package.json 的 scripts 要保证有 start 和 build 命令，start: 开发环境启动，build: 打包项目
- 其它的可参考已有模板的 `.umirc.ts` 或 `vue.config.js` 文件中的配置
- 模板渲染使用 ejs 模板


下面以 `app-template-admin` 模板为例进行步骤说明：

#### Step1: 启动模板开发模式

```shell
npm run dev-tpl
```

#### Step2: 配置模板

编辑 src/templates/tpl.config.dev.js


#### Step3: 进入预览模式

```shell
# 进入模板编译后的目录
cd template/dist/app-template-admin

# 安装依赖
npm install

# 启动
npm run start

# 启动后根据命令输出的地址访问即可
```

#### Step4: 实时预览

此时，可以一边修改模板文件，一边在浏览器里进行预览
  
  