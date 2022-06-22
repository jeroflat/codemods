import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import cart from './modules/cart';
import products from './modules/products';
import users from './modules/users';

import { IRootState } from './store.types';
// @ts-ignore
Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  modules: {
    cart,
    products,
    users,
  },
};

export default new Vuex.Store<IRootState>(store);
