import config from "core/config";
import { APP_ROUTES } from "lib/routes";

export const isVercelHost = (): boolean => {
  return window.location.hostname.indexOf(".vercel.app") !== -1;
};

export const getDynamicCookieDomain = (): string => {
  if (typeof window === "undefined") {
    return config("COOKIE_DOMAIN");
  }

  const hostname = window.location.hostname;

  // Skip test environments like http://localhost
  if (hostname.indexOf(".") === -1) {
    return hostname;
  }

  const subdomainsToSkip = ["staging", "staging-store"];
  const hostParts = hostname.split(".");
  let finalHostName = `.${hostname}`;

  if (
    hostParts.length > 2 &&
    !subdomainsToSkip.includes(hostParts[0]) &&
    !isVercelHost()
  ) {
    hostParts.shift();
    finalHostName = `.${hostParts.join(".")}`;
  }

  return finalHostName;
};

export const isEmptyObject = (obj: any) => {
  return JSON.stringify(obj) === "{}";
};
