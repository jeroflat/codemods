import { Module } from 'vuex';

import state from './state';
import actions from './actions';
import mutations from './mutations';

import { IRootState } from '../../store.types';
import { IProductsState } from './products.types';

const productsModule: Module<IProductsState, IRootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default productsModule;
