import SideDisplay from "components/Auth/SideDisplay";
import Button from "components/Button";
import { APP_ROUTES } from "lib/routes";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRegistrationUserType } from "../hooks";
import ClientSignupForm from "./components/ClientSignupForm";
import CreatorSignUpForm from "./components/CreatorSignUpForm";
import ProfessionalAssetsComponent from "./components/ProfessionalAssetsComponent";
import RegistrationSteps from "./components/RegistrationSteps";
import SetUpProfile from "./components/SetUpProfile";
import SkillsComponents from "./components/SkillsComponents";

function SignUp() {
  const { type } = useRegistrationUserType();

  return (
    <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row sm:h-fit lg:h-screen">
      <SideDisplay />

      <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-38 md:px-20 h-full flex flex-col justify-center scroll-smooth overflow-y-scroll">
        {type === "creator" ? <CreatorSignUpForm /> : <ClientSignupForm />}
        {/* <RegistrationSteps /> */}
      </div>
    </div>
  );
}

export default SignUp;
