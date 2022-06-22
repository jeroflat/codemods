<template>
  <div class="dashboard">
    <h2>
      Products: {{ productsCount }}
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsCount: 0,
    };
  },
};
</script>

<style lang="scss">
  .dashboard {
    position: relative;
  }
</style>
