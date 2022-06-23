<template>
  <div>
    <nav v-if="!isLoading" :class="{ fadeIn: !isLoading }" class="animated">
      <Button @click="handleCreateUser"> Create User </Button>
    </nav>
    <div class="users-table__spinner">
      <Spinner v-if="isLoading" />
    </div>
    <div v-if="!isLoading" :class="{ fadeIn: !isLoading }" class="animated">
      <Table>
        <Thead slot="thead">
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Shop</Th>
          </Tr>
        </Thead>
        <Tbody slot="tbody">
          <Tr v-for="user in users" :key="user.id">
            <Th>{{ user.firstName }}</Th>
            <Td>{{ user.lastName }}</Td>
            <Td>{{ user.shop }}</Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';

import Table, { Thead, Tbody, Tr, Th, Td } from 'components/base/Table';

const { mapState, mapActions } = createNamespacedHelpers('users');

export default {
  name: 'UsersTable',
  components: {
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Button,
    Spinner,
  },
  computed: mapState(['users', 'isLoading']),
  created() {
    this.fetchUsers();
  },
  methods: {
    handleCreateUser() {
      this.$router.push('/admin/users/new');
    },
    ...mapActions(['fetchUsers']),
  },
};
</script>

<style lang="scss">
@import '~styles/functions/px-to-rem';
@import '~styles/mixins';

.users-table {
  @include element(spinner) {
    text-align: center;
  }
}
</style>
