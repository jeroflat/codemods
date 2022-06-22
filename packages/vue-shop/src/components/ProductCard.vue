<template>
  <figure
    :class="[hasOverlay ? 'product-card--overlay' : 'product-card']"
    :style="{
      width,
      margin: '0 auto',
    }"
  >
    <div
      v-if="hasOverlay"
      class="product-card__overlay"
    />
    <img
      :src="image"
      :alt="product.name"
      @click="handleClick"
      @mouseover="handleMouseover"
      @mouseleave="handleMouseleave"
      class="img-fluid product-card__image"
    >
    <figcaption
      :class="[hasOverlay ? 'product-card__description--overlay' : 'product-card__description']"
    >
      {{ product.name }}
    </figcaption>
  </figure>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { IProduct } from '@/store/modules/products/products.types';

export default Vue.extend({
  name: 'ProductCard',
  props: {
    width: {
      default: '29rem',
      type: String,
    },
    hasOverlay: {
      default: false,
      type: Boolean,
    },
    product: {
      type: Object,
      default() {
        return {
          id: '',
          name: '',
          img: '',
        };
      },
    } as PropOptions<IProduct>,
    hasHover: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      image: this.product.img,
    };
  },
  methods: {
    handleClick() {
      const { id } = this.product;
      this.$router.push(`/product/${id}`);
    },
    handleMouseover(): void {
      if (this.hasHover) {
        this.setProductImage('imgHovered');
      }
    },
    handleMouseleave(): void {
      if (this.hasHover) {
        this.setProductImage('img');
      }
    },
    setProductImage(propName: string): void {
      this.image = this.product[propName];
    },
  },
});
</script>

<style lang="scss">
.product-card {
  position: relative;
}

.product-card--overlay {
  &:hover {
    .product-card__overlay {
      opacity: 0.4;
    }

    .product-card__description {
      opacity: 1;
    }
  }
}

.product-card__image {
  cursor: pointer;
}

.product-card__overlay {
  background: #000000;
  opacity: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: opacity 0.3s ease;
  width: 100%;
}

.product-card__description {
  color: #505050;
  text-align: center;
  font-size: 18px;
}

.product-card__description--overlay {
  align-items: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  opacity: 0;
  position: absolute;
  text-align: center;
  top: 0;
  transition: bottom 0.3s ease;
  width: 100%;
}
</style>
