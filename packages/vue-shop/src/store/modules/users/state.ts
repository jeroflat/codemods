import { IUsersState } from './users.type';

const usersState: IUsersState = {
  user: {
    firstName: '',
    lastName: '',
    shop: '',
  },
  users: [],
  isLoading: false,
  error: '',
};

export default usersState;
