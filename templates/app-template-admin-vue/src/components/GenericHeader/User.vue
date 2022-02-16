<template>
  <a-dropdown>
    <div class="user-info">
      <a-avatar :src="avatar || DEFAULT_AVATAR" :alt="`${name}'s avatar`"></a-avatar>
      <span class="user-name">{{ name }}</span>
    </div>
    <a-menu slot="overlay">
      <a-menu-item key="0">
        <a-icon type="mail"></a-icon>
        <span>{{ emailAddr }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { getDefaultAvatarFromConfig } from '@/config/app.utils';

export default Vue.extend({
  props: {
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    emailAddr: {
      type: String,
    },
  },
  data() {
    return {
      DEFAULT_AVATAR: getDefaultAvatarFromConfig(),
    };
  },
});
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-left: 12px;
}
</style>
