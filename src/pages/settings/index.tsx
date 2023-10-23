import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Settings from "features/Settings"



function SettingsPage() {
   return (
      <div>
         <Head>
            <title>{`Settings | ${SITE_NAME}`}</title>
         </Head>
         <main className="flex justify-between">
            <Sidebar />
            <Settings />
         </main>
      </div>
   );
}

export default SettingsPage;
