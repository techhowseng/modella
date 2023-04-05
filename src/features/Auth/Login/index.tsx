import AlertMessage from "components/AlertMessage";
import SideDisplay from "components/Auth/SideDisplay";
import Button from "components/Button";
import GradientBG from "components/GradientBG";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { LOGIN_FORM } from "../formFieldData";
import { loginFormDataSchema } from "../schema";
import { createSession } from "../services";
import { getSessionUser } from "../slice";
import { LoginSessionType } from "../types";

function Login() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(getSessionUser);
  const {
    handleChange,
    handleSubmit,
    errorMessage,
    setErrorMessage,
    setSuccessMessage,
  } = useForm(
    {
      email: "",
      password: "",
    },
    loginFormDataSchema,
    (formData: LoginSessionType) => {
      dispatch(createSession(formData)).then((res) => {
        if (res.payload.error) {
          setErrorMessage(res.payload.data.message);
        } else {
          setSuccessMessage(res.payload.message || res.type);
          location.href = APP_ROUTES.jobs;
        }
      });
    }
  );

  return (
    <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row sm:h-fit lg:h-screen">
      <SideDisplay />

      <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-38 md:px-20 h-full flex flex-col justify-center scroll-smooth overflow-y-scroll">
        <GradientBG />
        <div className="flex-1 w-full py-10 lg:py-20 md:py-24 px-0 lg:px-38 md:px-20 h-full flex flex-col justify-center">
          <div className="flex flex-col">
            <h1 className="text-3xl mb-10 font-bold">Sign In</h1>
            <div className="flex flex-row">
              <p className="mr-1">New User?</p>
              <Link href={APP_ROUTES.auth} className="base-blue">
                Create Account
              </Link>
            </div>
          </div>

          <div className="flex flex-col mt-10">
            {errorMessage && (
              <AlertMessage type="error" message={errorMessage} />
            )}

            <div className="grid grid-cols-6 gap-6">
              {LOGIN_FORM.map((field, index) => (
                <div key={index} className="col-span-6 sm:col-span-6">
                  <Input
                    type={field.type}
                    onChange={handleChange}
                    label={field.label}
                    name={field.name}
                    id={field.name}
                  />
                </div>
              ))}
            </div>

            {/* <div className="flex flex-col mt-10">
              <label className="mb-2">Password</label>
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="base-input w-full p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                />
                <HiOutlineEye className="absolute top-4 right-4" size={24} />
              </div>
            </div> */}

            <div className="w-full flex flex-col md:flex-col lg:flex-row mt-10 justify-between items-center">
              <p className="base-grey mb-10">Forget Password?</p>
              <Button
                onClick={handleSubmit}
                loading={loading}
                loadingText={"Loading..."}
              >
                <p className="text-white">Sign In</p>
              </Button>
            </div>
          </div>

          {/* <!---dskdlksld---> */}
        </div>
        {/* <!---dskdlksld---> */}
      </div>

      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default Login;
