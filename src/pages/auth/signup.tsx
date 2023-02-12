import SignUp from "features/Auth/SignUp";
import { SITE_NAME } from "lib/constants";
import Head from "next/head";
import React from "react";

function SignUpPage() {
  return (
    <>
      <Head>
        <title>Registration | {SITE_NAME}</title>
      </Head>
      <SignUp />
    </>
  );
}

export default SignUpPage;
