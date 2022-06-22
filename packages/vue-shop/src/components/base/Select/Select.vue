<template>
  <div
    role="listbox"
    class="select"
  >
    <div
      @click="handleClick"
      role="button"
      class="custom-select"
    >
      {{ buttonText }}
    </div>
    <div v-if="isOpen">
      <div
        v-for="item in items"
        :key="item.id"
        role="listbox"
        aria-labelledby="selectBox"
        class="select__items"
      >
        <div
          @click="handleSelect"
          role="option"
          class="select__item"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { ISelectItem } from './select.types';

export default Vue.extend({
  name: 'Select',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    buttonText: {
      type: String,
      default: 'Select',
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleClick(): void {
      this.isOpen = !this.isOpen;
    },
    handleSelect(item: ISelectItem): void {
      this.$emit('on-select', item);
    },
  },
});
</script>

<style lang="scss" scope>
  @import '~styles/functions/px-to-rem';
  @import '~styles/mixins';

  .select {
    @include element(item) {
      background: var(--white);
      padding: 6px 14px;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
