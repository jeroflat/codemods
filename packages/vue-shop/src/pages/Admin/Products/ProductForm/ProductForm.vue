<template>
  <form>
    <Input :value="product.value" />
  </form>
</template>

<script>
import Input from 'components/base/Input';

export default {
  components: {
    Input,
  },
  data() {
    return {
      product: {
        type: Object,
        default() {
          return {
            name: '',
          };
        },
      },
    };
  },
};
</script>

<style lang="scss">

</style>
