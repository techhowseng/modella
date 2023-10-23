import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Message from "features/Message"



function MessagePage() {
   return (
      <div>
         <Head>
            <title>{`Messages | ${SITE_NAME}`}</title>
         </Head>
         <main className="flex justify-between">
            <Sidebar />
            <Message />
         </main>
      </div>
   );
}

export default MessagePage;
