import { NextPageContext } from "next";
import { isServerRequest } from "lib/nextjs";
import Head from "next/head";
import React from "react";
import { APP_ROUTES } from "lib/routes";
import { verifyEmailToken } from "features/Auth/services";

const EmailVerification = ({ message }) => {
  return (
    <>
      <Head>
        <title>Verify Email | Modella</title>
      </Head>
      <div className="flex flex-col justify-center w-full">
        <p className="text-center mr-1 text-2xl mt-10">{message}</p>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  if (!isServerRequest(context)) {
    return { props: {} };
  }

  const redirectTo = (url: string) => {
    if (res) {
      res.setHeader("location", url);
      res.statusCode = 302;
      res.end();
    }
  };

  const {
    query: { token },
    res,
  } = context;

  // make a request to verify the token
  // if token is invalid, redirect to signup page
  const verificationRes = await verifyEmailToken(token as string);

  if (verificationRes.error) {
    return { props: { message: verificationRes.data.message } };
  } else {
    return redirectTo(`${APP_ROUTES.signup}?verified=true`);
  }
};

export default EmailVerification;
