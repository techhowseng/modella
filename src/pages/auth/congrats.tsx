import { SITE_NAME, SITE_TITLE } from "lib/constants";
import Head from "next/head";
import React from "react";
import Congrats from "features/Auth/Congrats";

function CongratPage() {
   return (
      <>
         <Head>
            <title>Registration | {SITE_NAME}</title>
         </Head>
         <Congrats />
      </>
   );
}

export default CongratPage;
