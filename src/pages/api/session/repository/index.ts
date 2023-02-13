import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SessionServices from "../service";
import UserServices from "../../user/service";
import { checkExistingUser, existsInDB } from "../../../../helper/util";
import { ResponseService } from "../../../../services/ResponseService";
import { EntityExistsError } from "helper/errors";
import { NextApiRequest, NextApiResponse } from "next";


export default class SessionRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}
	
	static async loginUser(req: NextApiRequest, res: NextApiResponse<any>) {
		try {
      const inputs = req.body;

      inputs.email = inputs.email.toLowerCase();

      const user = await existsInDB(inputs.email, "user", "email");
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        const jwtToken = jwt.sign(user, process.env.JWT_KEY,{
          expiresIn: "24hr",
        });
        const session = user ? await SessionServices.createSession(res, user.id, jwtToken) :  "";
        return session;
      }
      throw new Error("Email or password do not match.");
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async deleteSession(req: NextApiRequest, res: NextApiResponse<any>) {
		try {
      let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
			await SessionServices.deleteSession(res, token);
			return ResponseService.json(res, 200, "This user has been logged out.");
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}

