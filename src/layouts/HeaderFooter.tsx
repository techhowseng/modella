import Footer from "components/Footer";
import Header from "components/Header";
import Head from "next/head";
import React from "react";

function HeaderFooter({ title, children, authenticate = true }) {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>
      <Header authenticate={authenticate} />
      {children}
      <Footer />
    </div>
  );
}

export default HeaderFooter;
