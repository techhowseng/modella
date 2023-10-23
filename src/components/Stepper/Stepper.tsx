import React, { useState } from "react";
// import "./stepper.css";
import { TiTick } from "react-icons/ti";
const Stepper = () => {
   return (
      <div className="relative mt-10">
         <div className="w-10% h-1 rounded-full bg-gray-200"></div>
         <div className="absolute top-0 base-bg-color z-5 w-[35%] rounded-full h-1"></div>
         <div className="absolute -top-5 flex items-center justify-between w-full">
            <span className="flex items-center justify-center rounded-full base-bg-color text-white border-none h-11 w-11">1</span>
            <span className="flex items-center justify-center rounded-full bg-gray-200 h-11 w-11 text-white">2</span>
            <span className="flex items-center justify-center rounded-full bg-gray-200 h-11 w-11 text-white">3</span>
            <span className="flex items-center justify-center rounded-full "></span>
         </div>
      </div >
   );
};

export default Stepper;