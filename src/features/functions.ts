import { Model, User } from "@prisma/client";
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

export const isApplied = (user: User, applicants: Model[]) => {
  // find user in applicants
  const appliedModel = applicants?.find(
    (model) => String(model.id) === String(user.id)
  );
  return !!appliedModel;
};
