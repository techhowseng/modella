import HeaderFooter from "layouts/HeaderFooter";
import { SITE_NAME } from "lib/constants";
import React, { useState } from "react";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Notification from "features/Notification"



function NotificationPage() {
   return (
      <div>
         <Head>
            <title>{`Notifications | ${SITE_NAME}`}</title>
         </Head>
         <main className="flex justify-between">
            <Sidebar />
            <Notification />
         </main>
      </div>
   );
}

export default NotificationPage;
