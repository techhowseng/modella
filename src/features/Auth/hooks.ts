import { APP_ROUTES } from "lib/routes";
import { useRouter } from "next/router";
import queryString from "query-string";
import React from "react";
import { useEffect, useState } from "react";
import { signUpFormDataSchema } from "./schema";
import { AuthRegistrationFormType } from "./types";

export const useRegistrationUserType = () => {
  const router = useRouter();
  const { type } =
    typeof window === "object"
      ? queryString.parse(location.search)
      : { type: "" };

  useEffect(() => {
    if (!type) {
      router.push(APP_ROUTES.auth);
    }
  }, []);

  return { type };
};

export const useForm = (initialValues: any, cb: any) => {
  const [formData, setFormData] = useState(initialValues);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // validate data and dispatch action to register user here ...
    // confirm password and confirmPassword match
    signUpFormDataSchema.validate(formData).catch((err) => {
      setErrorMessage(err.errors[0]);
    });
    const isValid = await signUpFormDataSchema.isValid(formData);
    if (isValid) {
      delete formData.confirmPassword;
      return cb(formData);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errorMessage,
    setErrorMessage,
  };
};
