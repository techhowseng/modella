import AuthImageGuy from "assets/3927.svg";
import { SITE_NAME } from "lib/constants";
import React from "react";

function SideDisplay() {
  return (
    <div className="lg:flex md:flex hidden flex-col row-span-1 justify-center items-center base-bg-color min-h-full py-20 md:py-30 lg:py-36 px-8 lg:px-28 md:px-10">
      <h1 className="text-4xl mb-5 font-bold text-white">{SITE_NAME}</h1>
      <p className="text-white font-light">
        Your access to top notch proffesional services.
      </p>
      <div className="py-10">
        <img src={AuthImageGuy.src} alt="auth image" />
      </div>
      <p className="text-white font-light text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
    </div>
  );
}

export default SideDisplay;
