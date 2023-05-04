import jwt_decode from "jwt-decode";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  const decoded: any = jwt_decode(token);
  return decoded.exp * 1000 < new Date().getTime();
};
