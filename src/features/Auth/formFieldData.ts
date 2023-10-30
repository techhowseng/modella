import getCountries, { getState } from "lib/getCountries";

export const LOGIN_FORM = [
   {
      label: "Enter Email",
      type: "email",
      name: "email",
   },
   {
      label: "Enter Password",
      type: "password",
      name: "password",
   },
];

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

export const CLIENT_SIGNUP_COMPLETE_FORM = (stateList: any[]) => [
   {
      label: "Company name",
      type: "text",
      name: "companyName",
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
      label: "Country",
      type: "select",
      name: "country",
      options: getCountries(),
   },
   {
      label: "State",
      type: "select",
      name: "state",
      options: stateList,
   },
   {
      label: "Facebook Profile Link",
      type: "url",
      name: "social.facebook",
   },
   {
      label: "LinkedIn Profile Link",
      type: "url",
      name: "social.linkedIn",
   },
   {
      label: "Instagram Profile Link",
      type: "url",
      name: "social.instagram",
   },
   {
      label: "Twitter Profile Link",
      type: "url",
      name: "social.twitter",
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

export const CREATOR_SIGNUP_COMPLETE_FORM = (stateList: any[]) => [
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
      name: "dob",
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
      options: stateList,
   },
   {
      label: "Gender",
      type: "select",
      name: "gender",
      options: ["Male", "Female", "NotGiven"],
   },
];
