<template>
  <div class="page-about">
    <h1>Vue H5 路由跳转示例页面</h1>
    <h2>
      <a href="" target="_blank">进入 WIKI 查看模板使用文档</a>
    </h2>
    <ul class="doc-list">
      <li>
        <a href="https://v3.vuejs.org/guide/introduction.html" target="_blank"
          >Vue3 使用指南</a
        >
      </li>
      <li>
        <a
          href="https://next.router.vuejs.org/guide/migration/#new-features"
          target="_blank"
          >Vue Router for Vue3</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vuex/tree/4.0#breaking-changes"
          target="_blank"
        >
          Vuex for Vue3</a
        >
      </li>
    </ul>
    <h3><router-link to="/">返回首页</router-link></h3>
  </div>
</template>

<style lang="less">
.page-about {
  padding-top: 100px;
  text-align: center;
  h1,
  h2,
  h3 {
    margin-bottom: 20px;
    color: #333;
    font-size: 20px;
  }

  a {
    color: #42b983;
    font-size: 20px;
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }

  .doc-list {
    margin: 30px 0;
  }
}
</style>
