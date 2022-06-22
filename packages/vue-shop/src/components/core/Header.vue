<template>
  <header class="header">
    <Navigation />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

import Navigation from './Navigation.vue';

export default Vue.extend({
  name: 'Header',
  components: {
    Navigation,
  },
});
</script>

<style lang="scss">

  .header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

</style>
