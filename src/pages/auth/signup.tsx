import SignUp from "features/Auth/SignUp";
import Head from "next/head";
import React from "react";

function SignUpPage() {
  return (
    <>
      <Head>
        <title>Registration | Modella</title>
      </Head>
      <SignUp />
    </>
  );
}

export default SignUpPage;
