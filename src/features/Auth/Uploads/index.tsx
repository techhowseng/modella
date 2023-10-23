import SideDisplay from "components/Auth/SideDisplay";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { SITE_NAME } from "lib/constants";
import AuthImageGuy from "assets/Group 3851 (1).svg";
import Stepper from "components/Stepper/Stepper2";
import { BsPlus } from "react-icons/bs";


function Uploads() {
   return (
      <div className="flex ">
         <SideDisplay image={AuthImageGuy.src} />

         <div className="flex flex-col row-span-2/3 items-center flex-1 py-20 md:py-30 lg:py-14 px-10 md:px-20">
            <div className="flex flex-col mb-16 text-center">
               <h1 className="text-3xl  mx-auto mb-3 w-[80%] font-bold">Welcome, Greate Step To <span className="base-color">Showcase</span> Your Skill </h1>
               <p className="mr-1 text-sm text-gray-400">Please fill out the form</p>
               <Stepper />
            </div>
            <div className="flex flex-col justify-center items-center border w-[80%] max-w-[500px] rounded-2xl p-6">
               <div className="flex items-center justify-center w-[4rem] h-[4rem] border text-gray-300 rounded-full mb-3 cursor-pointer"><BsPlus className="text-4xl" /></div>
               <h1 className="text-xl font-bold">Upload Your
                  Pictures</h1>
               <p className="text-sm">In JPEG, ZIP OR PDF</p>
               <button className="w-full py-4 bg-gray-200 mt-6 rounded-2xl text-gray-400">Upload</button>
            </div>
            <Link className="flex items-center justify-center text-white w-[80%] py-4 rounded-2xl mt-6 lg:mt-auto mb-5 base-bg-color" href="/auth/username">
               Continue
            </Link>
         </div>
      </div>
   );
}

export default Uploads;
