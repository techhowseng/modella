import { SITE_NAME } from "lib/constants";
import Head from "next/head";
import React from "react";
import Auth from "features/Auth";
import { User } from "features/Auth/types";

function AuthPage() {
  return (
    <>
      <Head>
        <title>Sign In | {SITE_NAME}</title>
      </Head>
      <Auth user={{} as User} />
    </>
  );
}

export default AuthPage;
