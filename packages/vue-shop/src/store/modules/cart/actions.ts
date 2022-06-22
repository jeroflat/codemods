import { ActionTree } from 'vuex';

import * as types from './actionTypes';

import { IRootState } from '../../store.types';
import { ICartState } from './cart.types';

const cartActions: ActionTree<ICartState, IRootState> = {
  incrementCart({ commit }, count) {
    commit(types.INCREMENT_CART, count);
  },
  addToCart({ commit }, product) {
    commit(types.ADD_TO_CART, product);
  },
};

export default cartActions;
