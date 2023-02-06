import { NextPageContext } from "next";

/**
 * Meant to be used in `getInitialProps(props.ctx) or getServerSideProps(ctx)
 * to determine if the request is being made as an initial server render (returns true)
 * or an ajax SPA data fetch (returns false)
 */
export const isServerRequest = (ctx: NextPageContext): boolean => {
  if (process.browser) {
    return false;
  }

  const url = ctx.req?.url;
  if (url === undefined) {
    return true;
  }

  return url.indexOf("/_next/data") === -1;
};
