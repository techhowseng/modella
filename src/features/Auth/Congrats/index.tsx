import SideDisplay from "components/Auth/SideDisplay";
import { APP_ROUTES } from "lib/routes";
import Link from "next/link";
import React from "react";
import { SITE_NAME } from "lib/constants";
import AuthImageGuy from "assets/Group 3852.svg";
import ChatImg from "assets/Group 281.svg";
import GrassImg from "assets/Group 282.svg";
import Button from "components/Button";

function Congrats() {
   return (
      <div className="flex ">
         <SideDisplay image={AuthImageGuy.src} />

         <div className="md:ml-[35%] md:mt-[15%] flex flex-col row-span-2/3 justify-center items-center flex-1 py-20 md:py-30 lg:py-36 px-10 md:px-20">
            <div>
               <div className="mb-10 text-center md:hidden lg:hidden flex flex-col">
                  <h1 className="base-color text-4xl font-bold">{SITE_NAME}</h1>
               </div>
               <div className="lg:-mt-[20%]">
                  <img className="mx-auto mb-6" src={ChatImg.src} alt="congrats image" />
                  <div className="flex items-center">
                     <h1 className="text-center flex mx-auto items-center relative text-2xl md:text-3xl lg:text-4xl mb-4 font-bold text-black">
                        Congratulations
                        <img
                           className="absolute 
                           -right-12 bottom-6 lg:left-[275px] lg:bottom-6"
                           src={GrassImg.src} alt="Congrats image" />
                     </h1>
                  </div>
                  <p className="text-center max-w-[80%] mx-auto text-gray-500 md:text-lg  mb-10 font-light">
                     Please Do Ensure You Click On The Verification Link Sent To Your Mail To Activate Your Account.
                  </p>
               </div>
               <Link href={APP_ROUTES.login}>
                  <Button
                     className="mx-auto mt-6"
                  // onClick={handleSubmit}
                  // loading={loading}
                  // loadingText={"Registrying..."}
                  // href="/auth/congrats"
                  >
                     Sign in
                  </Button>
               </Link>
            </div>
         </div>

      </div>
   );
}

export default Congrats;
