<template>
  <div class="app-logo">
    <img class="logo" :src="logo" fit="cover" />
    <h1 class="title" v-if="!isFolded">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAppName, getLogo } from '../../config/app.utils';
export default Vue.extend({
  props: {
    isFolded: Boolean,
  },
  data() {
    return {
      title: getAppName(),
      logo: getLogo(),
    };
  },
});
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001529;
  height: 64px;
}

.logo {
  width: 30px;
  height: 30px;
}

.title {
  display: inline-block;
  font-size: 16px;
  margin-left: 12px;
  color: #ffffff;
  margin-bottom: 0;
}
</style>
