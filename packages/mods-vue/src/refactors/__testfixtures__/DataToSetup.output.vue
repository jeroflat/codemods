<template lang="ts">
<p>{{ greeting }} World!</p>;
</template>

<script>
import { ref } from 'vue';
` `
export default {
  setup() {
    const greeting = ref('Hello');

    return {
      greeting,
    };
  },
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
