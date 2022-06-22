import { Module } from 'vuex';

import state from './state';
import actions from './actions';
import mutations from './mutations';

import { IRootState } from '../../store.types';
import { ICartState } from './cart.types';

const CartModule: Module<ICartState, IRootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default CartModule;
