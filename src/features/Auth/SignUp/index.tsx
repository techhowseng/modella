import SideDisplay from "components/Auth/SideDisplay";
import React from "react";
import { useAppSelector } from "store/hooks";
import { useRegistrationUserType } from "../hooks";
import { getSessionUser, getStateList } from "../slice";
import ClientCompleteForm from "./components/ClientCompleteForm";
import ClientSignupForm from "./components/ClientSignupForm";
import CreatorSignUpForm from "./components/CreatorSignUpForm";
import ModelCompleteForm from "./components/ModelCompleteForm";

function SignUp() {
  const { type, verified } = useRegistrationUserType();
  const { data, loading, error, message } = useAppSelector(getSessionUser);
  const stateList = useAppSelector(getStateList);

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 h-[100vh]">
      <SideDisplay />

      <div className="flex flex-col row-span-2/3 justify-center items-center flex-1 py-20 md:py-30 lg:py-36 px-10 md:px-20 overflow-y-scroll">
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
