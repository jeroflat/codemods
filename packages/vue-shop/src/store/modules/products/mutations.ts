import { MutationTree } from 'vuex';

import { SET_PRODUCT, SET_PRODUCTS } from './actionTypes';

import { IProductsState, IProduct } from './products.types';

const productsMutations: MutationTree<IProductsState> = {
  [SET_PRODUCT](state, product: IProduct) {
    // eslint-disable-next-line no-param-reassign
    state.product = product;
  },
  [SET_PRODUCTS](state, products: Array<IProduct>) {
    // eslint-disable-next-line no-param-reassign
    state.products = products;
  },
};

export default productsMutations;
