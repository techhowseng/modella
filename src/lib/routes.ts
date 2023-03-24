export const APP_ROUTES = {
  home: "/",
  auth: "/auth",
  about: "/about",
  chat: "/chat",
  contact: "/contact",
  clientProfile: "/client",
  login: "/auth/login",
  signup: "/auth/signup",
  register: "/register",
  bioData: "/bio-data",
  dashboard: "/dashboard",
  profile: "/model",
  jobs: "/jobs",
  job: "/job-details",
  jobApplication: "/job-application",
  settings: "/settings",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  notFound: "/not-found",
  tos: "/terms-of-service",
  privacy: "/privacy-policy",
  serverError: "/server-error",
  unauthorized: "/unauthorized",
  forbidden: "/forbidden",
  "404": "/404",
  emailVerification: "/email-verification",
  emailVerificationSuccess: "/email-verification/success",
  emailVerificationFailed: "/email-verification/failed",
};

export const userProfileRoute = (user: { type: string }): string => {
  let link: string;
  if (user.type === "Model") {
    link = APP_ROUTES.profile;
  }
  if (user.type === "Client") {
    link = APP_ROUTES.clientProfile;
  }
  return link;
};
