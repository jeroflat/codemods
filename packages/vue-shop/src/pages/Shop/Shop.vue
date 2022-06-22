<template>
  <section class="shop">
    <Toolbar @on-click="handleToolbarClick" />
    <div class="row">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :width="gridValue"
        :product="product"
        :has-hover="true"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

import { createNamespacedHelpers } from 'vuex';

import ProductCard from 'components/ProductCard.vue';
import Toolbar from 'components/Toolbar';

const { mapState, mapActions } = createNamespacedHelpers('products');

export default Vue.extend({
  components: {
    ProductCard,
    Toolbar,
  },
  data() {
    return {
      gridValue: '44%',
    };
  },
  computed: mapState(['products']),
  created(): void {
    this.fetchProducts();
  },
  methods: {
    handleToolbarClick(filterValue: string): void {
      this.gridValue = `${filterValue}%`;
    },
    ...mapActions(['fetchProducts']),
  },
});
</script>

<style lang="scss">

  .shop {
    position: relative;
  }
</style>
