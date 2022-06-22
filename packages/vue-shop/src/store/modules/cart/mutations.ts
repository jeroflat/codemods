import { MutationTree } from 'vuex';

import {
  INCREMENT_CART,
  ADD_TO_CART,
} from './actionTypes';

import { ICartState } from './cart.types';

const cartMutations: MutationTree<ICartState> = {
  [INCREMENT_CART](state, count) {
    // eslint-disable-next-line no-param-reassign
    state.count += count;
  },
  [ADD_TO_CART](state, product) {
    // eslint-disable-next-line no-param-reassign
    state.products = [
      ...state.products,
      product,
    ];
  },
};

export default cartMutations;
