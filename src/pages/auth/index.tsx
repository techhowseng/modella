import { SITE_TITLE } from "lib/constants";
import Head from "next/head";
import React from "react";
import Auth from "features/Auth";
import { User } from "features/Auth/types";

function AuthPage() {
  return (
    <>
      <Head>
        <title>Sign In | Modella</title>
      </Head>
      <Auth user={{} as User} />
    </>
  );
}

export default AuthPage;
