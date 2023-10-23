// import LoginImagee from "assets/3927.svg";
import { SITE_NAME } from "lib/constants";
import LoginImage from 'assets/Group 3853.svg'
import React from "react";

function SideDisplay() {
   return (
      <div className="hidden md:flex md:flex-col space-y-auto  min-h-[100vh] w-[35%] text-center pt-16">
         <div className="">
            <h1 className="text-4xl font-bold base-color">{SITE_NAME}</h1>

         </div>
         <div className="pl-4 w-[85%] mt-auto lg:-mt-[10%]">
            <img className="object-cover" src={LoginImage.src} alt="auth image" />
         </div>

      </div>
   );
}

export default SideDisplay;
