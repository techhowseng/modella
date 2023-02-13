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
  message: string;
}

export type AuthComponenetType = {
  user: User;
};

export type LoginSessionType = {
  email: string;
  password: string;
};

export type AuthRegistrationFormType = {
  email: string;
  password: string;
  confirmPassword?: string;
  type: string;
};

export type AuthRegistrationCompleteFormType = {
  firstname: string;
  lastname: string;
  phone: {};
  DOB: string;
  address: string;
  state: string;
  country: string;
};
