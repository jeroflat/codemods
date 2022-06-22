<template>
  <form
    @submit.prevent="handleSubmit"
    class="users-form"
  >
    <div>
      <div class="form-group">
        <input
          :value="user.firstName"
          @change="handleChange"
          type="text"
          name="firstName"
          class="form-control"
          placeholder="First name"
        >
      </div>
      <div class="form-group">
        <input
          :value="user.lastName"
          @change="handleChange"
          type="text"
          name="lastName"
          class="form-control"
          placeholder="Last name"
        >
      </div>
      <div class="form-group">
        <input
          :value="user.email"
          @change="handleChange"
          type="email"
          name="email"
          class="form-control"
          placeholder="Email"
        >
      </div>
      <div class="form-group">
        <Select
          :items="[{ id: 0, text: 'Item' }]"
          @on-select="handleSelect"
        />
      </div>
      <Button
        @click="handleSubmit"
        type="submit"
      >
        Create User
      </Button>
      <div class="users-table__spinner">
        <Spinner
          v-if="isLoading"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import Select from 'components/base/Select';

const { mapState, mapActions } = createNamespacedHelpers('users');

export default {
  name: 'UsersForm',
  components: {
    Button,
    Spinner,
    Select,
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },
  computed: {
    ...mapState(['isLoading', 'error']),
  },
  methods: {
    handleSubmit() {
      this.createUser(this.user);
      this.user = {};
    },
    handleChange($event) {
      const { target } = $event;
      const { name, value } = target;
      this.user = {
        ...this.user,
        [name]: value,
      };
    },
    // eslint-disable-next-line
    handleSelect(shop) {},
    ...mapActions(['createUser']),
  },
};
</script>

<style lang="scss">
  .users-form {
    max-width: 30rem;
  }
</style>
