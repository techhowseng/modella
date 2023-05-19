import { User } from "@prisma/client";

export type ModelType = {};

export interface UserState {
  data: { user: User | {}; selectedCountryOption: string; stateList: any[] };
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
  image?: FormData;
  file?: any;
  firstname: string;
  lastname: string;
  phone: {};
  dob: string;
  address: string;
  state: string;
  country: string;
};

export type ClientRegistrationCompleteFormType = {
  companyName: string;
  phone: {
    number_1: string;
  };
  address: string;
  country: string;
  state: string;
  social: {
    facebook: string;
    twitter: string;
    linkedIn: string;
    instagram: string;
  };
};
