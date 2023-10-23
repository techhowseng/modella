import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Sidebar from "components/Sidebar";

const Jobs = dynamic(
   () => import("features/Jobs"), { ssr: false }
)


function JobsPage() {
   return (
      <div>
         <Head>
            <title>{`Available Jobs | ${SITE_NAME}`}</title>
         </Head>
         <main className="flex justify-between">
            <Sidebar />
            <Jobs />
         </main>
      </div>
   );
}

export default JobsPage;
