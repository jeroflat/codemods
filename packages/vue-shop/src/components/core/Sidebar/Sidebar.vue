<template>
  <aside class="sidebar">
    <header>
      <h4 class="text-center">
        {{ title }}
      </h4>
    </header>
    <nav class="sidebar__links">
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        @click="handleClick(link)"
        tag="button"
        class="btn btn-link"
      >
        {{ link.text }}
      </router-link>
    </nav>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Sidebar',
  props: {
    title: {
      type: String,
      default: 'Sidebar',
    },
    links: {
      type: Array,
      default() {
        return [
          {
            path: '/admin',
            text: 'Admin',
          },
        ];
      },
    },
  },
  data() {
    return {
      username: {
        type: String,
        default: 'Jero',
      },
    };
  },
});
</script>

<style lang="scss">
  @import '~styles/mixins';
  .sidebar {
    border-right: 1px solid #ddd;
    height: 100%;
    left: 0;
    padding: 0 1rem;
    position: fixed;
    top: 0;
    width: 15rem;
    @include element(links) {
      @include flex($flex-direction: column);
    }
  }
</style>
