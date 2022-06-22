<template>
  <section class="container-fluid admin">
    <div class="admin__wrapper">
      <Sidebar
        :title="'Dashboard'"
        :links="links"
      />
      <div class="admin__content">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from 'core/Sidebar/Sidebar';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      links: [
        {
          path: '/admin',
          text: 'Admin',
        },
        {
          path: '/admin/products',
          text: 'Products',
        },
        {
          path: '/admin/users',
          text: 'Users',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import '~styles/mixins';
  .admin {
    height: 100vh;
    display: flex;
    flex-direction: column;
    @include element(wrapper) {
      flex-grow: 1;
    }
    @include element(content) {
      padding-left: 15rem;
      width: 100%;
    }
  }

</style>
