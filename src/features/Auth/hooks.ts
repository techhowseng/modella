import { APP_ROUTES } from "lib/routes";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect } from "react";

export const useRegistrationUserType = () => {
  const router = useRouter();
  const { type } =
    typeof window === "object"
      ? queryString.parse(location.search)
      : { type: "" };

  useEffect(() => {
    if (!type) {
      router.push(APP_ROUTES.auth);
    }
  }, []);

  return { type };
};
