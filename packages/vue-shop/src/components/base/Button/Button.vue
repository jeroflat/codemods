<template>
  <button
    :type="type"
    :class="skins"
    @click="handleClick"
    class="button"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import classNames from 'classnames';

export default Vue.extend({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const {
      primary,
    } = this.$props;
    return {
      skins: classNames({
        'button--primary': primary,
      }),
    };
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss">
@import '~styles/mixins';
.button {
  @include button();
  @include modifier(primary) {
    background: #020203;
    color: #ffffff;
  }
}
</style>
