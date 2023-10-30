import AlertMessage from "components/AlertMessage";
import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "features/hooks";
import { signUpFormDataSchema } from "features/Auth/schema";
import { registerUser } from "features/Auth/services";
import { getSessionUser } from "features/Auth/slice";
import { AuthRegistrationFormType } from "types";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
   CREATOR_SIGNUP_FORM,
   CREATOR_SIGNUP_COMPLETE_FORM,
} from "../../formFieldData";
import Stepper from "components/Stepper/Stepper";
import CheckBox from "components/CheckBox";
import { SITE_NAME } from "lib/constants";

function CreatorSignUpForm({ verified }: { verified?: boolean }) {
   const dispatch = useAppDispatch();
   const [successMessage, setSuccessMessage] = React.useState<string>("");
   const { data, loading, error, message } = useAppSelector(getSessionUser);
   const { handleChange, handleSubmit, errorMessage, setErrorMessage } = useForm(
      {
         email: "",
         password: "",
         confirmPassword: "",
         type: "Model",
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
            <div className="flex flex-col mb-16 text-center">
               <h1 className="text-3xl  mx-auto mb-3 w-[80%] font-bold">Welcome, Greate Step To <span className="base-color">Showcase</span> Your Skill </h1>
               <p className="mr-1 text-sm text-gray-400">Please fill out the form</p>
               <Stepper />
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto text-sm font-bold">
                     <Input
                        className="text-sm font-light border-none bg-gray-200 text-gray-400 rounded-2xl outline-0"
                        label="Full Name"
                        name="name"
                        placeholder="Enter Full Name"
                        type="text"
                        onChange={handleChange}
                     />
                     <Input
                        className="text-sm font-light border-none bg-gray-200 text-gray-400  rounded-2xl-[15px] outline-0"
                        label="Enter Email"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        onChange={handleChange}
                     />
                     <Input
                        className="text-sm font-light border-none bg-gray-200 text-gray-400 rounded-2xl outline-0"
                        label="Enter Phone"
                        name="phone"
                        placeholder="Enter Phone"
                        type="text"
                        onChange={handleChange}
                     />
                     <Input
                        className="text-sm font-light border-none bg-gray-200 text-gray-400 rounded-2xl outline-0"
                        label="Enter Password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        onChange={handleChange}
                     />
                     <Input
                        className="text-sm font-light border-none bg-gray-200 text-gray-400 rounded-2xl outline-0"
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
                  <Link className="flex items-center justify-center text-white w-full py-4 rounded-2xl mt-9 base-bg-color" href="/auth/uploads">
                     Continue
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
}

export default CreatorSignUpForm;
