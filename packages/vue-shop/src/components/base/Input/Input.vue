<template>
  <input
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="input"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>

<style lang="scss">
  .input {
    appearance: none;
    background: transparent;
    border-radius: 2px;
    border: 2px solid #ddd;
    position: relative;
    &:focus {
      outline:none;
    }
  }
</style>
