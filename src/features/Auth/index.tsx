import SideDisplay from "components/Auth/SideDisplay";
import Button from "components/Button";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { FaUserCheck, FaUserFriends } from "react-icons/fa";
import { AuthComponenetType } from "./types";

function Auth({ user }: AuthComponenetType) {
  return (
    <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row sm:h-fit lg:h-screen">
      <SideDisplay />

      <div className="flex-1 py-20 md:py-30 lg:py-36 px-10 lg:px-48 md:px-20 h-full flex flex-col justify-start">
        <div className="flex flex-col">
          <h1 className="text-3xl mb-5 font-bold">Create an Account</h1>
          <div className="flex flex-row">
            <p className="mr-1">What do u wish to sign up as?</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row mt-10">
            {/* // icon before text */}
            <Link href={`${APP_ROUTES.signup}?type=creator`}>
              <div className="transition ease-in-out w-full border rounded-lg p-10 hover:base-color hover:base-border-color focus:base-border-color">
                <div className=" flex flex-row items-center">
                  <div className="p-4 rounded-full border">
                    <FaUserCheck size={24} />
                  </div>
                  <p className="ml-2 text-xl">Creators</p>
                </div>
                <p className="mt-4">
                  Sign up here, upload your skillset and profile and get
                  discovered by the world.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-row mt-10">
            <Link href={`${APP_ROUTES.signup}?type=client`}>
              <div className="transition ease-in-out w-full border rounded-lg p-10 hover:base-color hover:base-border-color focus:base-border-color">
                <div className="flex flex-row items-center">
                  <div className="p-4 rounded-full border">
                    <FaUserFriends size={24} />
                  </div>
                  <p className="ml-2 text-xl">Client</p>
                </div>
                <p className="mt-4">
                  Sign up here as a company or individual to discover
                  skills/talents for your fit.
                </p>
              </div>
            </Link>
          </div>
        </div>
        {/* <!---dskdlksld---> */}
      </div>

      {/* <!---dskdlksld---> */}
    </div>
  );
}

export default Auth;
