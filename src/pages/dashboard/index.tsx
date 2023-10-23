import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Dashboard from "features/Dashboard";



function hirePage() {
   return (
      <div>
         <Head>
            <title>{`Dashboard | ${SITE_NAME}`}</title>
         </Head>
         <main className="flex justify-between">
            <Sidebar />
            <Dashboard />
         </main>
      </div>
   );
}

export default hirePage;
