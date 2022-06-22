<template functional>
  <div class="table">
    <slot name="thead" />
    <slot name="tbody" />
  </div>
</template>

<style lang="scss" scoped>
// table    { display: table }
// tr       { display: table-row }
// thead    { display: table-header-group }
// tbody    { display: table-row-group }
// tfoot    { display: table-footer-group }
// col      { display: table-column }
// colgroup { display: table-column-group }
// td, th   { display: table-cell }
// caption  { display: table-caption }
.table {
  display: table;
}
</style>
