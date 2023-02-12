import getCountries, { getState } from "lib/getCountries";

export const CLIENT_SIGNUP_FORM = [
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
  },
];

export const CLIENT_SIGNUP_COMPLETE_FORM = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
  },
  {
    label: "Company name",
    type: "text",
    name: "companyName",
  },
  {
    label: "Country",
    type: "select",
    name: "country",
    options: [],
  },
];

export const CREATOR_SIGNUP_FORM = [
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
  },
];

export const CREATOR_SIGNUP_COMPLETE_FORM = [
  {
    label: "First Name",
    type: "text",
    name: "firstname",
  },
  {
    label: "Last name",
    type: "text",
    name: "lastname",
  },
  {
    label: "Phone Number",
    type: "phone",
    name: "phone",
  },
  {
    label: "Address",
    type: "text",
    name: "address",
  },
  {
    label: "Date of birth",
    type: "date",
    name: "DOB",
  },
  {
    label: "Country",
    type: "select",
    name: "country",
    options: getCountries(),
  },
  {
    label: "State",
    type: "select",
    name: "state",
    options: getState("Nigeria"),
  },
];
