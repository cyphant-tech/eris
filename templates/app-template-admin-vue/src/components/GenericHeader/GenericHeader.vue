<template>
  <div class="header-container">
    <a-icon
      :type="isMenuFolded ? 'menu-unfold' : 'menu-fold'"
      data-testid="toggle-menu"
      @click="handleToggleMenu"
    ></a-icon>
    <user :name="name" :avatar="avatar" :emailAddr="emailAddr"></user>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import User from './User.vue';

export default Vue.extend({
  async mounted() {
    
  },
  components: {
    User,
  },
  data() {
    return {
      name: '',
      avatar: '',
      isMenuFolded: false,
      emailAddr: '',
    };
  },
  methods: {
    handleToggleMenu() {
      this.$emit('toggleMenu');
      this.isMenuFolded = !this.isMenuFolded;
    },
  },
});
</script>
<style lang="less" scoped>
.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
