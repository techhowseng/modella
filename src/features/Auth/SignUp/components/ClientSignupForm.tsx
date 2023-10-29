import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import CheckBox from "components/CheckBox";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { signUpFormDataSchema } from "features/Auth/schema";
import { registerUser } from "features/Auth/services";
import { getSessionUser } from "features/Auth/slice";
import { AuthRegistrationFormType } from "../../../../types";
import { SITE_NAME } from "lib/constants";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
   CLIENT_SIGNUP_FORM,
} from "../../formFieldData";

function ClientSignupForm({ verified }: { verified?: boolean }) {
   const dispatch = useAppDispatch();
   const { data, loading, error, message } = useAppSelector(getSessionUser);
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
         type: "Client",
      },
      signUpFormDataSchema,
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
      <div className="">
         {!error && message ? null : (
            <div className="flex flex-col items-center justify-center mx-auto mb-16 text-center">
               <h1 className="text-3xl  mx-auto mb-3 w-[80%] font-bold">Welcome, You Are A <span className="base-color">Step Ahead</span> To Great Services </h1>
               <p className="mr-1 text-sm text-gray-400">Please fill out the form</p>
            </div>
         )}

         <div className="">
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto text-sm text-gray-700 font-bold">
                     <Input
                        className="bg-transparent text-sm font-light rounded-[15px] outline-0"
                        label="Full Name"
                        name="name"
                        placeholder="Enter Full Name"
                        type="text"
                        onChange={handleChange}
                     />
                     <Input
                        className="bg-transparent text-sm font-light  rounded-[15px] outline-0"
                        label="Enter Company Name"
                        name="Company name"
                        placeholder="Enter Company Name"
                        type="text"
                        onChange={handleChange}
                     />
                     <Input
                        className="bg-transparent text-sm font-light  rounded-[15px] outline-0"
                        label="Enter Email"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        onChange={handleChange}
                     />
                     <Input
                        className="bg-transparent text-sm font-light rounded-[15px] outline-0"
                        label="Enter Country Name"
                        name="Country name"
                        placeholder="Enter Country"
                        type="text"
                        onChange={handleChange}
                     />
                     <Input
                        className="bg-transparent text-sm font-light rounded-[15px] outline-0"
                        label="Enter Password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        onChange={handleChange}
                     />
                     <Input
                        className="bg-transparent text-sm font-light rounded-[15px] outline-0"
                        label="Re-Enter Password"
                        name="password"
                        placeholder="Re-Enter Password"
                        type="password"
                        onChange={handleChange}
                     />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-6">
                     <CheckBox name={"tos"} onChange={() => { }}>
                        I accept the{" "}
                        <span className="base-blue">
                           <Link href={APP_ROUTES.tos}>Terms and conditions</Link>
                        </span>{" "}
                        of {SITE_NAME}.
                     </CheckBox>
                     <p className="text-sm">
                        Already have an account?{" "}
                        <span className="base-blue">
                           <Link href={APP_ROUTES.login}>Login</Link>
                        </span>{" "}
                     </p>
                  </div>
                  <Link href="/auth/congrats">
                     <Button
                        className="mx-auto mt-6"
                        onClick={handleSubmit}
                        loading={loading}
                        loadingText={"Registrying..."}
                     // href="/auth/congrats"
                     >
                        Register
                     </Button>
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
}

export default ClientSignupForm;
