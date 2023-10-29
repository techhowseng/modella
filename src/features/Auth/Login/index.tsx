import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { LOGIN_FORM } from "../formFieldData";
import { loginFormDataSchema } from "../schema";
import { createSession } from "../services";
import { getSessionUser } from "../slice";
import { LoginSessionType } from "../../../types";
import LoginSideDisplay from "components/Auth/LoginSidebar";

function Login() {
   const dispatch = useAppDispatch();
   const { loading } = useAppSelector(getSessionUser);
   const { query } = useRouter();
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
               if (query.redirect) {
                  location.href = query.redirect as string;
               } else {
                  // for Client
                  location.href = APP_ROUTES.hire;
                  // for models
                  // location.href = APP_ROUTES.jobs
               }
            }
         });
      }
   );

   return (
      <div className="w-full h-full md:flex items-center justify-center">
         <LoginSideDisplay />

         <div className="flex md:ml-[35%] lg:px-[10%] mx-auto w-[100%] justify-center items-center py-10 h-full md:py-30 lg:py-36 px-10 md:px-20">
            <div className="w-full">
               <div className="flex flex-col">
                  <h1 className="text-4xl mb-10 font-bold">Hello, Welcome Back</h1>
               </div>

               <form className="flex flex-col mt-10">
                  {errorMessage && (
                     <AlertMessage type="error" message={errorMessage} />
                  )}

                  <div className="flex flex-col space-y-4">
                     {LOGIN_FORM.map((field, index) => (
                        <div key={index} className="col-span-6 font-bold sm:col-span-6">
                           <Input
                              className="bg-gray-200 rounded-xl border-0 outline-0"
                              type={field.type}
                              onChange={handleChange}
                              label={field.label}
                              placeholder={field.label}
                              name={field.name}
                              id={field.name}
                           />
                        </div>
                     ))}
                     <Link href="#" className="base-grey mb-10 ml-auto hover:base-color -mt-6">Forget Password?</Link>
                  </div>

                  <div className="w-[100%] flex flex-col md:flex-col lg:w-[100%] mt-10 justify-between items-center">
                     <Button
                        onClick={handleSubmit}
                        loading={loading}
                        loadingText={"Loading..."}
                     >
                        Sign In
                     </Button>
                     <div className="flex flex-row mt-9">
                        <p className="mr-1">Not Registered Yet? </p>
                        <Link href={APP_ROUTES.auth} className="base-blue">
                           Register Here
                        </Link>
                     </div>
                  </div>
               </form>

               {/* <!---dskdlksld---> */}
            </div>
            {/* <!---dskdlksld---> */}
         </div>

         {/* <!---dskdlksld---> */}
      </div>
   );
}

export default Login;
