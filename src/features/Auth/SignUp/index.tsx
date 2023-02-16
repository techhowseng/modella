import SideDisplay from "components/Auth/SideDisplay";
import React from "react";
import { useAppSelector } from "store/hooks";
import { useRegistrationUserType } from "../hooks";
import { getSessionUser } from "../slice";
import ClientCompleteForm from "./components/ClientCompleteForm";
import ClientSignupForm from "./components/ClientSignupForm";
import CreatorSignUpForm from "./components/CreatorSignUpForm";
import ModelCompleteForm from "./components/ModelCompleteForm";

function SignUp() {
  const { type, verified } = useRegistrationUserType();
  const { data } = useAppSelector(getSessionUser);

  console.log("verified && data?.user >>> ", type, verified, data?.user);
  return (
    <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row sm:h-fit lg:h-screen">
      <SideDisplay />

      <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-38 md:px-20 flex flex-col justify-center overflow-y-scroll">
        {type === "model" && <CreatorSignUpForm />}
        {type === "client" && <ClientSignupForm />}
        {/* @ts-ignore */}
        {verified && data?.user?.type?.toLowerCase() === "model" && (
          <ModelCompleteForm />
        )}
        {/* @ts-ignore */}
        {verified && data?.user?.type?.toLowerCase() === "client" && (
          <ClientCompleteForm />
        )}
      </div>
    </div>
  );
}

export default SignUp;
