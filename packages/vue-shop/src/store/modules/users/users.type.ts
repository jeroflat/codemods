export interface IUser {
  firstName: string;
  lastName: string;
  shop: string;
}

export interface IUsersState {
  user: IUser;
  users: Array<IUser>;
  isLoading: boolean;
  error: string;
}
