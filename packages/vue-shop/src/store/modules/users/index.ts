import { Module } from 'vuex';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import { IRootState } from '../../store.types';
import { IUsersState } from './users.type';

const usersModule: Module<IUsersState, IRootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default usersModule;