<template functional>
  <div class="th">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
  .th {
    display: table-cell;
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
</style>
