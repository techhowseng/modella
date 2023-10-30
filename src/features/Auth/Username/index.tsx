import SideDisplay from "components/Auth/SideDisplay";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { SITE_NAME } from "lib/constants";
import AuthImageGuy from "assets/Group 3851 (1).svg";
import Stepper from "components/Stepper/Stepper3";
import { BsImage, BsPlus } from "react-icons/bs";
import Input from "components/Input";


function Username() {
   return (
      <div className="flex h-screen bg-white">
         <SideDisplay image={AuthImageGuy.src} />

         <div className="md:ml-[35%] lg:px-[10%] flex flex-col row-span-2/3 items-center flex-1 py-20 lg:py-14 px-10 md:px-20 h-full">
            <div className="flex flex-col mb-16 text-center">
               <h1 className="text-3xl mx-auto mb-3 w-[80%] font-bold">Welcome, Greate Step To <span className="base-color">Showcase</span> Your Skill </h1>
               <p className="mr-1 text-sm text-gray-400">Please fill out the form</p>
               <Stepper />
            </div>
            <div className="flex w-full items-center gap-7 mt-8">
               <div className="relative flex items-center justify-center w-[4rem] h-[4rem] border text-gray-400 rounded-full mb-3 cursor-pointer"><BsImage className="text-2xl" /> <span className="absolute -top-3 -right-2 z-10 bg-white flex items-center justify-center w-[2rem] h-[2rem] border border-gray-300 text-gray-400 rounded-full mb-3 cursor-pointer"><BsPlus className="text-xl" /></span> </div>
               <p className="text-sm text-gray-500">Please Add A Photo Of Yourself</p>
            </div>
            <div className="w-full text-sm mt-10 font-semibold text-gray-500">
               <Input
                  className="text-sm w-full font-light border-none bg-gray-200 rounded-4xl outline-0"
                  label="Choose A Username"
                  name="name"
                  placeholder="Choose Username"
                  type="text"
                  onChange={() => { }}
               />
            </div>
            <Link className="flex mt-14 items-center justify-center text-white w-full py-4 rounded-2xl lg:mt-auto mb-5 base-bg-color" href="/auth/congrats">
               Finish
            </Link>
         </div>
      </div>
   );
}

export default Username;
