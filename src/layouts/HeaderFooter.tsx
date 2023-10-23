import Footer from "components/Footer";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Head from "next/head";
import React from "react";

function HeaderFooter({ title, children, authenticate = true }) {
   return (
      <div className="">
         <Head>
            <title>{title}</title>
         </Head>
         <main className="flex">
            <Sidebar />
            {/* <Header authenticate={authenticate} />
            {children}
            <Footer /> */}
         </main>
      </div>
   );
}

export default HeaderFooter;
