import { SITE_TITLE } from "lib/constants";
import Head from "next/head";
import React from "react";
import Auth from "features/Auth";

function AuthPage() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Auth />
    </>
  );
}

export default AuthPage;
