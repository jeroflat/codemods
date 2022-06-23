<template>
  <div>
    <nav>
      <Button @click="handleCreateProduct"> Create Product </Button>
    </nav>
    <Table>
      <Thead slot="thead">
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Stock</Th>
          <Th>Shop</Th>
        </Tr>
      </Thead>
      <Tbody slot="tbody">
        <Tr v-for="product in products" :key="product.name">
          <Th>{{ product.name }}</Th>
          <Td>{{ product.price }}</Td>
          <Td>{{ product.stock }}</Td>
          <Td>{{ product.shop }}</Td>
        </Tr>
      </Tbody>
    </Table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Button from 'components/base/Button';

import Table, { Thead, Tbody, Tr, Th, Td } from 'components/base/Table';

const { mapState, mapActions } = createNamespacedHelpers('products');

export default {
  components: {
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Button,
  },
  computed: mapState(['products']),
  created() {
    this.fetchProducts();
  },
  methods: {
    handleCreateProduct() {
      this.$router.push('/admin/products/new');
    },
    ...mapActions(['fetchProducts']),
  },
};
</script>

<style></style>
