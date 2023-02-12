import { APP_ROUTES } from "lib/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookieData } from "./functions";

export const useGetSessionUser = () => {
  const userData = getCookieData();
  const router = useRouter();

  useEffect(() => {
    if (!userData.id) {
      router.push(APP_ROUTES.login);
    }
  }, [userData]);

  return { userData };
};
