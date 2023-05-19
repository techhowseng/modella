import * as yup from "yup";

export const signUpFormDataSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  type: yup.string().required(),
});

export const loginFormDataSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signUpCompleteFormDataSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  dob: yup.string().required("DOB is required"),
  gender: yup.string(),
});

const urlTest =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const clientCompleteFormDataSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  phone: yup.object().shape({
    number_1: yup.string(),
  }),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  social: yup.object().shape({
    facebook: yup.string().matches(urlTest, "Please Enter a valid url"),
    linkedIn: yup.string().matches(urlTest, "Please Enter a valid url"),
    twitter: yup.string().matches(urlTest, "Please Enter a valid url"),
    instagram: yup.string().matches(urlTest, "Please Enter a valid url"),
  }),
  image: yup.object(),
});
