import { SITE_NAME, SITE_TITLE } from "lib/constants";
import Head from "next/head";
import React from "react";
import Login from "features/Auth/Login";

function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | {SITE_NAME}</title>
      </Head>
      <Login />
    </>
  );
}

export default LoginPage;
