import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../../../lib/prisma";
import EmailProvider from 'next-auth/providers/email';
import { ResponseService } from "../../../services/ResponseService";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
     CredentialProvider({
      authorize: async (credentials, _req) => {
        try {
          const { email, password } =  credentials as {
            email: string, password: string
          }
        const existingUser = await prisma.user.findFirst({
          where: { email }
        });
          if (existingUser) {
            const userId = existingUser.id,
            userEmail = existingUser.email,
            userPassword = existingUser.password,
            userCreated = existingUser.createdAt;

            bcrypt.compare(password, userPassword)
            .then(isMatch => {
              if (isMatch) {
                const payload = {
                  id: userId,
                  email: userEmail,
                  createdAt: userCreated,
                };

                jwt.sign(
                  payload,
                  process.env.JWT_KEY,
                  {
                    expiresIn: 31556926
                  },
                  (err, token) => {
                    return `Bearer ${token}`
                  })
              } else {
                return ResponseService.json("error", "Password incorrect");
              }
            })
          } else {
            return null
          }
          return null;
        } catch (e: any) {
          //const errorMessage = e.response.data.message;
          //throw new Error(errorMessage);
          return null;
        }
      },
      credentials: undefined
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      } else if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (token) {
        session.sessionToken = token.accessToken
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    encryption: true
  }
};

const authHandler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, authOptions);
export default authHandler;
