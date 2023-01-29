import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
import { verify } from "./helper/jwtSignVerify";

interface Request extends NextApiRequest {
  headers: {
    authorization: string
  }
}

export default async (req: Request, res: NextApiResponse) => {
  const reqMethod = req.method;
  const passedMethod = ["POST", "PATCH", "PUT", "DELETE"];
  const BreakError = {};
  let token: string;
    // @ts-ignore

  const authorization  = req.headers.get("authorization");
  if (authorization && authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1];

  try {
    if (token && passedMethod.includes(reqMethod)) {
      // jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      //   if (decoded.expiredAt < Date.now() && decoded.email == req.body.email) {
      //     return NextResponse.next();
      //   }
      // });

      const decoded = await verify(token, process.env.JWT_KEY);
      if (decoded && Math.floor(Date.now()/1000) < decoded.exp) {
        return NextResponse.next();
      }
    } throw BreakError;
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
  matcher: ['/api/user/:path*', '/api/admin/:path*']
};