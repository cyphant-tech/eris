<template>
  <a-layout class="container">
    <a-layout-sider :collapsed="isMenuFolded" :collapsible="true" :trigger="null">
      <slot name="aside">
        <generic-menu :isFolded="isMenuFolded" :menu="menuItems"></generic-menu>
      </slot>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header dark">
        <slot name="header">
          <generic-header @toggleMenu="handleToggleMenu"></generic-header>
        </slot>
      </a-layout-header>
      <a-layout-content>
        <main class="content dark">
          <router-view></router-view>
        </main>
      </a-layout-content>
      <a-layout-footer>
        <slot name="footer">
          <generic-footer></generic-footer>
        </slot>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Vue from 'vue';
import GenericHeader from '@/components/GenericHeader/GenericHeader.vue';
import GenericFooter from '@/components/GenericFooter/GenericFooter.vue';
import GenericMenu from '@/components/GenericMenu/GenericMenu.vue';
import { getMenuItemsFromConfig } from '../../config/app.utils';

export default Vue.extend({
  data() {
    return {
      menuItems: getMenuItemsFromConfig(),
      isMenuFolded: false,
    };
  },
  components: {
    GenericHeader,
    GenericFooter,
    GenericMenu,
  },
  methods: {
    handleToggleMenu() {
      this.isMenuFolded = !this.isMenuFolded;
    },
  },
});
</script>
<style lang="less" scoped>
.container {
  min-height: 100vh;
}

.header {
  border-bottom: 1px solid #e6e6e6;

  &.dark {
    background: #ffffff;
  }
}

.aside {
  background-color: rgb(238, 241, 246);
  border-right: 1px solid #e6e6e6;
}

.content {
  margin: 24px 16px;
  padding: 16px;
  min-height: 280px;

  &.dark {
    background-color: #ffffff;
  }
}
</style>
