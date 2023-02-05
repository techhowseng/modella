import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { verify } from "./helper/jwtSignVerify";
import { authorisedPathMethods } from "./helper/constants";

interface Request extends NextApiRequest {
  headers: {
    authorization: string
  },
  nextUrl: {
    pathname: string
  }
}

export default async (req: Request, res: NextApiResponse) => {
  const BreakError = {};
  // @ts-ignore
  const authorization = req.headers.get("authorization");
  let token = authorization && authorization.split(' ')[0] === 'Bearer' ? authorization.split(' ')[1] : null;
  try {
    if (authorisedPathMethods[req.nextUrl.pathname.split("/")[2]].includes(req.method)) {
      const decoded = await verify(token, process.env.JWT_KEY);
      console.log("came in decoded", decoded)
      if (decoded && Math.floor(Date.now()/1000) < decoded.exp) {
        return NextResponse.next();
      } throw BreakError;
    } return NextResponse.next();
  } catch(err) {
    return new Response('This user is not authenticated.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }
}

export const config = {
  matcher: [
    '/api/user/:path*',
    '/api/client/:path*',
    '/api/model/:path*',
    '/api/contracts/:path*',
    '/api/session/:path*',
    '/api/history/:path*',
    '/api/jobs/:path*',
    '/api/media/:path*'
  ]
};
