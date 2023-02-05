import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import CheckBox from "components/CheckBox";
import Input from "components/Input";
import { useForm, useRegistrationUserType } from "features/Auth/hooks";
import { registerUser } from "features/Auth/services";
import { getAuthUser } from "features/Auth/slice";
import { AuthRegistrationFormType } from "features/Auth/types";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CLIENT_SIGNUP_FORM } from "../../formFieldData";

function ClientSignupForm() {
  const { type } = useRegistrationUserType();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(getAuthUser);
  const { handleChange, handleSubmit, errorMessage } = useForm(
    {
      email: "",
      password: "",
      confirmPassword: "",
      type: "Client",
    },
    (formData: AuthRegistrationFormType) => {
      return dispatch(registerUser(formData));
    }
  );

  return (
    <div className="flex-1 w-full py-10 lg:py-20 md:py-24 px-0 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      <div className="flex flex-col">
        <p className="mr-1 text-2xl">
          Welcome, you are a step ahead to great services
        </p>
      </div>

      <div className="flex flex-col mt-10">
        {errorMessage && <AlertMessage type="error" message={errorMessage} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {CLIENT_SIGNUP_FORM.map((field) => (
            <Input
              label={field.label}
              name={field.name}
              type={field.type}
              onChange={handleChange}
            />
          ))}
        </div>

        <CheckBox name={"tos"} onChange={() => {}}>
          I accept the{" "}
          <span className="base-blue">
            <Link href={APP_ROUTES.tos}>Terms and conditions</Link>
          </span>{" "}
          of Modella.
        </CheckBox>
      </div>

      <Button
        className="mt-10"
        onClick={handleSubmit}
        loading={loading}
        loadingText={"Registrying..."}
      >
        <p className="text-white">Register</p>
      </Button>
      {/* <!---------------> */}

      <p className="mt-10">
        Already have an account?{" "}
        <span className="base-blue">
          <Link href={APP_ROUTES.login}>Login</Link>
        </span>{" "}
      </p>
    </div>
  );
}

export default ClientSignupForm;
