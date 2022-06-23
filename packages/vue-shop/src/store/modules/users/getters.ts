import { GetterTree } from 'vuex';

import { IRootState } from '../../store.types';
import { IUsersState } from './users.type';

const usersGetters: GetterTree<IUsersState, IRootState> = {
  getUsers: (state) => () => state.users,
};

export default usersGetters;
