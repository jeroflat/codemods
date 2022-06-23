<template>
  <section>
    <h3>{{ title }}</h3>
    <router-view />
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Products',
    };
  },
};
</script>
