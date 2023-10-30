import SideDisplay from "components/Auth/SideDisplay";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { FaUserCheck, FaUserFriends } from "react-icons/fa";
import { AuthComponenetType } from "../../types";
import AuthImageGuy from "assets/3927.svg";

function Auth({ user }: AuthComponenetType) {
   return (
      <div className="flex ">
         <SideDisplay image={AuthImageGuy.src} />

         <div className="md:ml-[35%] flex flex-col justify-center items-center flex-1 py-20 md:py-30 lg:pt-[20%] px-10 md:px-20">
            <div>
               <div className="lg:-mt-[20%]">
                  <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mb-10 font-bold text-black">
                     Hello, we’re <span className="base-color">pleased</span> to have you
                     here
                  </h1>
                  <p className="text-center text-base md:text-lg lg:text-xl mb-10 font-light">
                     what do you wish to sign up as?
                  </p>
               </div>
            </div>
            <div className="flex flex-col lg:justify-center item-center lg:w-[100%] lg:flex-row gap-4">
               <div className="transition ease-in-out lg:w-[40%] md:w-full w-full border rounded-3xl p-6 hover:dim-bg-yellow focus:dim-bg-color hover:cursor-pointer">
                  <Link href={`${APP_ROUTES.signup}?type=model`}>
                     <div className=" flex flex-col justify-center items-center">
                        <div className="p-4 rounded-full border">
                           <FaUserCheck className="base-color" size={24} />
                        </div>
                     </div>
                     <div className="mt-4 flex flex-col justify-center items-center">
                        <p className="ml-2 text-xl font-bold">Model</p>
                        <p className="text-center">
                           Sign up here, upload your skillset and profile and get
                           discovered by the world.
                        </p>
                     </div>
                  </Link>
               </div>
               <div className="transition ease-in-out lg:w-[40%] md:w-full w-full border rounded-3xl p-6 hover:dim-bg-yellow focus:dim-bg-color hover:cursor-pointer">
                  <Link href={`${APP_ROUTES.signup}?type=client`}>
                     <div className=" flex flex-col justify-center items-center">
                        <div className="p-4 rounded-full border">
                           <FaUserFriends className="base-color" size={24} />
                        </div>
                     </div>
                     <div className="mt-4 flex flex-col justify-center items-center">
                        <p className="ml-2 text-xl font-bold">Client</p>
                        <p className="text-center">
                           Sign up here as a company or individual to discover
                           skills/talents for your fit.
                        </p>
                     </div>
                  </Link>
               </div>
            </div>
         </div>

      </div>
   );
}

export default Auth;
