<template>
  <div id="app">
    <page> </page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Page from './components/Page/index.vue';

@Component({
  components: {
    Page,
  },
  async mounted() {
    
  },
})
export default class App extends Vue {}
</script>

<style></style>
