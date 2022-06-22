import { ActionTree } from 'vuex';

import api from 'api';
import * as types from './actionTypes';

import { IRootState } from '../../store.types';
import { IProductsState } from './products.types';

const productsActions: ActionTree<IProductsState, IRootState> = {
  fetchProduct({ commit }, id) {
    api.get(`/products/${id}`)
      .then((response) => {
        commit(types.SET_PRODUCT, response.data);
      });
  },
  fetchProducts({ commit }) {
    api.get('/products')
      .then((response) => {
        commit(types.SET_PRODUCTS, response.data);
      });
  },
};

export default productsActions;
