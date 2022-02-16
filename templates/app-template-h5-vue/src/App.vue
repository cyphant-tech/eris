<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
// Layout 为布局组件，控制页面基础布局，通过 slot 实现
import Layout from '@/layouts';

export default {
  components: {
    Layout,
  },
};
</script>

<style lang="less" src="./global.less"></style>
