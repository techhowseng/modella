import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export default async (req: NextRequest, res: NextApiResponse) => {
  const currentUser = req.cookies.get("currentUser")?.value;
  const reqMethod = req.method;
  const passedMethod = ["PATCH", "PUT", "DELETE"];
  const BreakError = {};
  let token: string;

  try {
    if (currentUser?.split(' ')[0] === 'Bearer' &&
      Date.now() <= JSON.parse(currentUser).expiredAt &&
      passedMethod.includes(reqMethod)) {
      token = currentUser.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) throw BreakError;
        else if (decoded.role == "admin") return NextResponse.next();
      });
    } throw BreakError;
  } catch(err) {
    return new Response('Unauthorised.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }
}

export const config = {
  matcher: ['/api/admin/:path*']
};