export const CONFIG = {
  // put config
  SHOPIFY_APP_BASEURL:
    (process.env.NEXT_PUBLIC_SHOPIFY_APP_BASEURL as string) || "",
  APP_URL: (process.env.NEXT_PUBLIC_APP_URL as string) || "",
  ALLOW_PARTIAL_CONFIG:
    (process.env.NEXT_PUBLIC_ALLOW_PARTIAL_CONFIG as string) || "",
  COOKIE_DOMAIN: (process.env.NEXT_PUBLIC_COOKIE_DOMAIN as string) || "",
  BRAND_NAME: (process.env.NEXT_PUBLIC_BRAND_NAME as string) || "",
  BRAND_CONTACT_EMAIL:
    (process.env.NEXT_PUBLIC_BRAND_CONTACT_EMAIL as string) || "",
  PAYSTACK_PUBLIC_KEY:
    (process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string) || "",
  SEGMENT_ID: (process.env.NEXT_PUBLIC_SEGMENT_ID as string) || "",
  // To use this variable, make sure that "Automatically expose System
  // Environment Variables" is checked in your Vercel Project Settings.
  ENVIRONMENT:
    ((process.env.NEXT_PUBLIC_VERCEL_ENV || "development") as string) || "",
  DATADOG_LOG_LEVEL:
    (process.env.NEXT_PUBLIC_DATADOG_LOG_LEVEL as string) || "disabled",
  DATADOG_CLIENT_TOKEN:
    (process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN as string) || false,
  STOREFRONT_API_BASEURL:
    (process.env.NEXT_PUBLIC_STOREFRONT_API_BASEURL as string) || false,
  API_BASEURL: (process.env.NEXT_PUBLIC_API_BASEURL as string) || false,
  BRAND_PUBLIC_KEY:
    (process.env.NEXT_PUBLIC_BRAND_PUBLIC_KEY as string) || false,
  TRANSLATION_SERVICE_BASEURL:
    (process.env.NEXT_PUBLIC_TRANSLATION_SERVICE_BASEURL as string) || false,
  REPORT_MISSING_TRANSLATIONS:
    (process.env.NEXT_PUBLIC_REPORT_MISSING_TRANSLATIONS as string) || false,
  CROWDIN_DISTRIBUTION_HASH:
    (process.env.NEXT_PUBLIC_CROWDIN_DISTRIBUTION_HASH as string) || false,
  CROWDIN_PROJECT: (process.env.NEXT_PUBLIC_CROWDIN_PROJECT as string) || false,
  CROWDIN_DOMAIN: (process.env.NEXT_PUBLIC_CROWDIN_DOMAIN as string) || false,
  CROWDIN_IN_CONTEXT_ENABLED:
    (process.env.NEXT_PUBLIC_CROWDIN_IN_CONTEXT_ENABLED as string) || false,
  TAG_MANAGER_ID: (process.env.NEXT_PUBLIC_TAG_MANAGER_ID as string) || false,
  SENTRY_DSN: (process.env.NEXT_PUBLIC_SENTRY_DSN as string) || "",
  CLIENT_ID: (process.env.NEXT_PUBLIC_CLIENT_ID as string) || ""
} as const;

export type SETTINGS = typeof CONFIG;
