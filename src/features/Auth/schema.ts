import * as yup from "yup";

export const signUpFormDataSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  type: yup.string().required(),
});
