<template>
  <div class="layout">
    <!-- 页面公共 header -->
    <!-- <page-header class="page-header"></page-header> -->

    <!-- 页面主体部分 -->
    <div class="main">
      <slot></slot>
    </div>

    <!-- 页面公共 footer -->
    <!-- <page-footer class="page-footer"></page-footer> -->
  </div>
</template>
<script>
// import PageHeader from '@/components/PageHeader';
// import PageFooter from '@/components/PageHeader';

export default {
  components: {
    // PageHeader,
    // PageFooter,
  },
};
</script>

<style lang="less" src="./index.less"></style>
