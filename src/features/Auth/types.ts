export type User = {
  id: string;
  email: string;
  password: string;
  type: string;
};

export interface UserState {
  data: { user: User | {} };
  loading: boolean;
  error: boolean;
}

export type AuthComponenetType = {
  user: User;
};

export type AuthRegistrationFormType = {
  email: string;
  password: string;
  confirmPassword?: string;
  type: string;
};
