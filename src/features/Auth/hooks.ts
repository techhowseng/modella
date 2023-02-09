import { getCookieData } from "features/functions";
import { APP_ROUTES } from "lib/routes";
import { useRouter } from "next/router";
import queryString from "query-string";
import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { SIGN_UP_STEPS } from "./SignUp/constants";
import { registerSessionUser } from "./slice";

export const useFieldsErrorCheck = (
  values: any,
  schema: any,
  handleNext: any,
  setErrorMessage: any,
  e: any
) => {
  schema
    .validate(values)
    .then(() => {
      handleNext(e);
    })
    .catch((err: { errors: string[] }) => {
      setErrorMessage(err.errors[0]);
    });
};

export const useRegistrationUserType = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { type, verified } =
    typeof window === "object"
      ? queryString.parse(location.search)
      : { type: "", verified: false };

  useEffect(() => {
    if (!type && !verified) {
      router.push(APP_ROUTES.auth);
    } else if (verified) {
      const userData = getCookieData();
      dispatch(registerSessionUser(userData));
    }
  }, []);

  return { type, verified };
};

export const useForm = (initialValues: any, schema: any, cb: any) => {
  const [formData, setFormData] = useState(initialValues);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [stepState, setStepState] = React.useState(SIGN_UP_STEPS.MORE_DETAILS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    // validate data and dispatch action to move to next step here ...
    setStepState(stepState + 1);
  };

  // handle submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    // validate data and dispatch action to register user here ...
    // confirm password and confirmPassword match
    schema.validate(formData).catch((err) => {
      setErrorMessage(err.errors[0]);
    });
    const isValid = await schema.isValid(formData);
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
    setSuccessMessage,
    successMessage,
    stepState,
    handleNext,
  };
};
