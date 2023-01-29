import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SessionServices from "../service";
import UserServices from "../../user/service";
import { randomStringGenerator } from "../../../../helper/util";
import { checkExistingUser, existsInDB } from "../../../../helper/util";
import { ResponseService } from "../../../../helper/ResponseService";
import { EntityExistsError } from "helper/errors";


export default class SessionRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}
	
	static async loginUser(req, res) {
		try {
      const inputs = req.body;

      inputs.email = inputs.email.toLowerCase();
      inputs.password = inputs.password;

      const user = await existsInDB(inputs.email, "user", "email");
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        const jwtToken = jwt.sign(user, process.env.JWT_KEY,{
          expiresIn: "1hr", // 1 year in seconds
        });
        const session = user ? await SessionServices.createSession(res, user.id, jwtToken) :  "";
        return session;
      }
      throw new Error("Email and password do not match.");
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async deleteSession(req, res) {
		try {
      let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
			const user = await SessionServices.deleteSession(res, token);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}

