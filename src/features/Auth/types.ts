export type User = {
  id: string;
  heading: string;
  content: string;
};

export interface UserState {
  user: User[];
}

export type AuthComponenetType = {
  user: User;
};
