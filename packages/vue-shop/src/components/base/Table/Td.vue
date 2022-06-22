<template functional>
  <div class="td">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
  .td {
    display: table-cell;
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
</style>
