<template>
  <aside class="product">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-md-9 col-xl-9">
        <figure class="product-image">
          <img
            :src="product.img"
            :alt="product.name"
            class="img-fluid"
          >
        </figure>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-md-3 col-xl-3">
        <ProductDescription :product="product" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';

import { createNamespacedHelpers } from 'vuex';

import ProductDescription from './ProductDescription';

const { mapState, mapActions } = createNamespacedHelpers('products');

export default Vue.extend({
  name: 'Product',
  components: {
    ProductDescription,
  },
  computed: mapState(['product']),
  created(): void {
    const { id } = this.$route.params;
    this.fetchProduct(id);
  },
  methods: mapActions(['fetchProduct']),
});
</script>

<style lang="scss">
  @import '~styles/variables';
  @import '~styles/mixins';

  .product {
    padding-top: 4rem;
  }

  .product-image {
    @include flex($justify-content: center);

    @include media($lg) {
      justify-content: flex-start;
    }
  }
</style>
