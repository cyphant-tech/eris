<template>
  <span>
    <a-icon v-if="typeof icon === 'string'" :type="icon" data-testid="icon"></a-icon>
    <span>{{ name }}</span>
  </span>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    icon: {
      type: String,
    },
    name: {
      type: String,
    },
  },
});
</script>
