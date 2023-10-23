import { SITE_NAME, SITE_TITLE } from "lib/constants";
import Head from "next/head";
import React from "react";
import Uploads from "features/Auth/Uploads";

function CongratPage() {
   return (
      <>
         <Head>
            <title>Registration | {SITE_NAME}</title>
         </Head>
         <Uploads />
      </>
   );
}

export default CongratPage;
