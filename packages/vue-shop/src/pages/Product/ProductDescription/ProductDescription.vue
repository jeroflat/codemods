<template>
  <article class="product-description">
    <header>
      <h2>
        <strong>{{ product.name }}</strong>
      </h2>
    </header>
    <h4>
      {{ product.shop }}
    </h4>
    <p class="product-price">
      {{ product.price }}
    </p>
    <p class="product-text">
      {{ product.description }}
    </p>
    <div>
      <Button
        @click="handleAddToCart"
        primary
      >
        Add To Cart
      </Button>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

import Button from 'components/base/Button';

export default Vue.extend({
  name: 'ProductDescription',
  components: {
    Button,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
});

</script>

<style lang="scss">

  .product-description {
    position: relative;
  }
  .product-price {
    margin: 2rem 0;
  }
  .product-text {
    margin: 2rem 0;
  }
</style>
