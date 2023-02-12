import * as yup from "yup";

export const bioCompleteFormDataSchema = yup.object().shape({
  bio: yup.string().required("Bio is required"),
  DOB: yup.string().required("Last Name is required"),
  phone: yup.object().shape({
    phone_1: yup.string(),
  }),
});

const urlTest =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const socialsFormDataSchema = yup.object().shape({
  social: yup.object().shape({
    facebook: yup.string().matches(urlTest, "Please Enter a valid url"),
    linkedIn: yup.string().matches(urlTest, "Please Enter a valid url"),
    twitter: yup.string().matches(urlTest, "Please Enter a valid url"),
    instagram: yup.string().matches(urlTest, "Please Enter a valid url"),
  }),
});

export const modelAttributesFormDataSchema = yup.object().shape({
  height: yup
    .number()
    .typeError("Height doesn't look like a number")
    .positive("height number can't start with a minus")
    .integer("height number can't include a decimal point")
    .min(1),
  bust: yup
    .number()
    .typeError("Bust doesn't look like a number")
    .positive("bust number can't start with a minus"),
  waist: yup
    .number()
    .typeError("Waist doesn't look like a number")
    .positive("waist number can't start with a minus"),
  hip: yup
    .number()
    .typeError("Hip doesn't look like a number")
    .positive("hip number can't start with a minus"),
  shoeSize: yup
    .number()
    .typeError("Shoe Size doesn't look like a number")
    .positive("Shoe Size number can't start with a minus"),
  weight: yup
    .number()
    .typeError("Weight doesn't look like a number")
    .positive("Weight number can't start with a minus"),
  complexion: yup.string(),
  isAvailable: yup.bool(),
});
