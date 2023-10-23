import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Sidebar from "components/Sidebar";
import MyJobs from "features/MyJobs"



function DashboardPage() {
   return (
      <div>
         <Head>
            <title>{`My Jobs | ${SITE_NAME}`}</title>
         </Head>
         <main className="flex justify-between">
            <Sidebar />
            <MyJobs />
         </main>
      </div>
   );
}

export default DashboardPage;
