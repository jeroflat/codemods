import { MutationTree } from 'vuex';

import {
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_FAILURE,
  CREATE_USERS_REQUEST,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_FAILURE,
} from './actionTypes';

import { IUsersState, IUser } from './users.type';

const usersMutations: MutationTree<IUsersState> = {
  [USERS_REQUEST](state) {
    const usersState = state;
    usersState.isLoading = true;
  },
  [USERS_SUCCESS](state, users: Array<IUser>) {
    const usersState = state;
    usersState.users = users;
    usersState.isLoading = false;
  },
  [USERS_FAILURE](state, error) {
    const usersState = state;
    usersState.error = error;
    usersState.isLoading = false;
  },
  // create
  [CREATE_USERS_REQUEST](state) {
    const usersState = state;
    usersState.isLoading = true;
  },
  [CREATE_USERS_SUCCESS](state, user: IUser) {
    const usersState = state;
    usersState.user = user;
    usersState.isLoading = false;
  },
  [CREATE_USERS_FAILURE](state, error) {
    const usersState = state;
    usersState.error = error;
    usersState.isLoading = false;
  },
};

export default usersMutations;
