export const APP_ROUTES = {
   home: "/",
   auth: "/auth",
   applied: '/applied',
   about: "/about",
   contact: "/contact",
   clientProfile: "/client",
   login: "/auth/login",
   signup: "/auth/signup",
   congrats: "/auth/congrats",
   register: "/register",
   bioData: "/settings/bio-data",
   accountInfo: "/settings/account-information",
   setNotification: "/settings/notification",
   dashboard: "/dashboard",
   profile: "/model",
   notification: "/notification",
   message: "/message",
   hire: "/hire",
   jobs: "/jobs",
   myJobs: "/my-jobs",
   createJob: "/my-jobs/create-job",
   job: "/job/{slug}",
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

export const resolveRoute = (route: string, slug: string | number) => {
   return route.replace("{slug}", slug as string);
};
