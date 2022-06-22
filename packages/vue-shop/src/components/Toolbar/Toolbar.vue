<template>
  <nav class="toolbar">
    <div class="toolbar__filters">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="handleFilterClick(filter)"
        class="toolbar__button"
      >
        <Icon
          :name="filter.icon"
          :selected="filter.id === selected"
        />
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from 'components/base/Icon';

import { IDataToolbar, Filter } from './toolbar.types';

export default Vue.extend({
  components: {
    Icon,
  },
  data(): IDataToolbar {
    return {
      selected: 0,
      filters: [
        {
          id: 0,
          icon: 'grid-4',
          value: '44',
        },
        {
          id: 1,
          icon: 'grid-6',
          value: '22',
        },
      ],
    };
  },
  methods: {
    handleFilterClick(filter: Filter): void {
      this.selected = filter.id;
      this.$emit('on-click', filter.value);
    },
  },
});
</script>

<style lang="scss">
  @import '../../assets/scss/mixins/flex';

  .toolbar {
    @include flex($justify-content: flex-end);
    padding: 0.5rem 0;
  }

  .toolbar__button {
    background: none;
    margin: 0;
    border: none;
    outline: none;
    padding: 0;
    &:focus {
      border: none !important;
      outline: none !important;
    }
  }

  .toolbar__filters {
    @include flex($justify-content: space-evenly);
    width: 5rem;
  }

</style>
