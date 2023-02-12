import { getCookieData } from "features/functions";
import { APP_ROUTES } from "lib/routes";
import { useRouter } from "next/router";
import queryString from "query-string";
import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { SIGN_UP_STEPS } from "./SignUp/constants";
import { registerSessionUser } from "./slice";

export const useRegistrationUserType = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = getCookieData();
  const { type, verified } =
    typeof window === "object"
      ? queryString.parse(location.search)
      : { type: "", verified: false };

  useEffect(() => {
    if (!type && !verified) {
      router.push(APP_ROUTES.auth);
    } else if (verified) {
      dispatch(registerSessionUser(userData));
    }
  }, []);

  return { type, verified };
};
