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
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CLIENT_SIGNUP_FORM } from "../../formFieldData";

function ClientSignupForm() {
  const { type } = useRegistrationUserType();
  const dispatch = useAppDispatch();
  const { data, loading, error, message } = useAppSelector(getAuthUser);
  const {
    handleChange,
    handleSubmit,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
  } = useForm(
    {
      email: "",
      password: "",
      confirmPassword: "",
      type: "Model",
    },
    (formData: AuthRegistrationFormType) => {
      dispatch(registerUser(formData)).then((res) => {
        if (res.payload.error) {
          setErrorMessage(res.payload.data.message);
        } else {
          setSuccessMessage(res.payload.message);
        }
      });
    }
  );

  return (
    <div className="flex-1 w-full py-10 lg:py-20 md:py-24 px-0 lg:px-38 md:px-20 h-full flex flex-col justify-center">
      {!error && message ? null : (
        <div className="flex flex-col">
          <p className="mr-1 text-2xl">
            Welcome, you are a step ahead to great services
          </p>
        </div>
      )}

      <div className="flex flex-col mt-10">
        {errorMessage && <AlertMessage type="error" message={errorMessage} />}
        {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}

        {!error && message ? (
          <p className="text-xl">
            A verification token has been sent to your email, Please click to
            verify
          </p>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 items-center">
              {CLIENT_SIGNUP_FORM.map((field) => (
                <Input
                  key={field.name}
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
        )}
      </div>
    </div>
  );
}

export default ClientSignupForm;
