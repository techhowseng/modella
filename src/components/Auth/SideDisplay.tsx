import { SITE_NAME } from "lib/constants";
import React from "react";

function SideDisplay({ image }) {
   return (
      <div className="hidden fixed left-0 md:flex md:flex-col space-y-auto base-bg-color min-h-[100vh] w-[35%] text-center pt-16">
         <div className="">
            <h1 className="text-4xl mb-2 font-bold text-white">{SITE_NAME}</h1>
            <p className="text-white text-sm font-light">
               Your access to top notch proffesional services.
            </p>
         </div>
         <div className="mt-auto pb-[20%]">
            <div className="py-5 w-[60%] mx-auto -translate-x-4">
               <img className="object-contain" src={image} alt="auth image" />
            </div>
            <p className="text-white font-light w-[70%] mx-auto">
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Standard dummy text ever
               since the 1500s
            </p>
         </div>

      </div>
   );
}

export default SideDisplay;
