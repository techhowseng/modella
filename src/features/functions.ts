import { getCookie } from "helper/cookie";
import { SESSION_NAME } from "lib/constants";

export const getCookieData = () => {
  return typeof window === "object" && getCookie(SESSION_NAME)
    ? JSON.parse(getCookie(SESSION_NAME) as string)
    : {};
};

export const getSessionToken = () => {
  return getCookieData()?.sessionToken;
};

export const setServerToken = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${getSessionToken()}`,
    },
  };
};
