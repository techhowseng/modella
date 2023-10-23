import SideDisplay from "components/Auth/SideDisplay";
import React from "react";
import { useAppSelector } from "store/hooks";
import { useRegistrationUserType } from "../hooks";
import { getSessionUser, getStateList } from "../slice";
import ClientCompleteForm from "./components/ClientCompleteForm";
import ClientSignupForm from "./components/ClientSignupForm";
import CreatorSignUpForm from "./components/CreatorSignUpForm";
import ModelCompleteForm from "./components/ModelCompleteForm";
import Stepper from "components/Stepper/Stepper";
import AuthImageGirl from "assets/Group 3851 (1).svg";

function SignUp() {
   const { type, verified } = useRegistrationUserType();
   const { data, loading, error, message } = useAppSelector(getSessionUser);
   const stateList = useAppSelector(getStateList);

   return (
      <div className="flex w-full">
         <SideDisplay image={AuthImageGirl.src} />

         <div className="flex max-w-[800px] md:w-[65%] mx-auto justify-center items-center py-10 md:py-10 lg:py-26 px-10 md:px-20">
            {/* <Stepper /> */}
            {type === "model" && <CreatorSignUpForm />}
            {type === "client" && <ClientSignupForm />}
            {/* @ts-ignore */}
            {verified && data?.user?.type?.toLowerCase() === "model" && (
               <ModelCompleteForm
                  loading={loading}
                  userData={data.user}
                  stateList={stateList}
               />
            )}
            {/* @ts-ignore */}
            {verified && data?.user?.type?.toLowerCase() === "client" && (
               <ClientCompleteForm stateList={stateList} />
            )}
         </div>
      </div>
   );
}

export default SignUp;
