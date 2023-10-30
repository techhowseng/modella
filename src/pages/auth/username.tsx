import { SITE_NAME, SITE_TITLE } from "lib/constants";
import Head from "next/head";
import React from "react";
import Username from "features/Auth/Username";

function CongratPage() {
   return (
      <>
         <Head>
            <title>Registration | {SITE_NAME}</title>
         </Head>
         <Username />
      </>
   );
}

export default CongratPage;
