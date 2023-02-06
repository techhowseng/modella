import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserServices, { TUser } from "../service";
import SessionServices from "../../session/service";
import { getUser, randomStringGenerator } from "../../../../helper/util";
import { checkExistingUser, existsInDB } from "../helper"
import NotificationService from "../../../../services/NotificationService";
import { ResponseService } from "../../../../services/ResponseService";
import { EntityExistsError } from "helper/errors";

let JWT_KEY = process.env.JWT_KEY;

export default class UserRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

	static async createUser(req, res) {
		try {
			const inputs = req.body;
      inputs.email = inputs.email.toLowerCase();
			// this should be in service
			const existingEmail = await prisma.user.findFirst({
				where: { 
					email: inputs.email
				},
			});
			if (Boolean(existingEmail)) {
				return ResponseService.json(
					res,
					new EntityExistsError('user', inputs.email)
				);
			}
			const verificationToken = randomStringGenerator();
			const newVerification = await UserServices.createVerificationToken(
				inputs,
				verificationToken
			);
			await NotificationService.newSignup({
				email: inputs.email,
				code: verificationToken
			});
      return ResponseService.json(
				res,
				200,
				'Please verify your email address within 10 minutes', 
				newVerification
			);
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

  static async updateUser(req, res) {
    interface Input {
      email?: string;
      password?: string;
      type?: string;
    }

    try {
      const { email, password, type } = req.body;
      let { pid } = req.query;

      const user = await getUser(req);
      if (user) {
        pid = user.type == "Admin" ? pid : user.id;
      }
      let input: Input = {};
      email ? (input.email = email.toLowerCase()) : null;
      password ? (input.password = bcrypt.hashSync(password, 8)) : null;
      type ? (input.type = type) : null;
      const updatedUser = await UserServices.updateUser(res, pid, input);
      return updatedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUser(req, res) {
    try {
      const { pid } = req.query;
      const user = await UserServices.getUser(res, pid);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await UserServices.getUserByEmail(res, email);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteUser(req, res) {
    try {
      let { pid } = req.query;
      const user = await getUser(req);
      if (user) {
        pid = user.type == "Admin" ? pid : user.id;
      }
      const deletedUser = await UserServices.deleteUser(pid);
      return deletedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getSession(req, res) {
    try {
      const { token } = req.body;
      const user = await SessionServices.getSession(res, token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateSession(req, res) {
    try {
      const { token } = req.body;
      const user = await SessionServices.updateSession(res, token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async createVerificationToken(req, res) {
    try {
      const { token, identifier } = req.body;
      const user = await UserServices.createVerificationToken(
        identifier,
        token
      );
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getVerificationToken(req, res) {
    try {
      const { token } = req.body;
      const user = await UserServices.getVerificationToken(token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async verifyUser(req, res) {
		try {
			const { pid } = req.query;
			const verifiedUser = await UserServices.verifyToken(res, pid);
			if (verifiedUser) {
				const { email, password, type } = verifiedUser;
				const user = await UserServices.createUser(res, email, password, type);
				await UserServices.deleteVerificationToken(res, email);
				const jwtToken = jwt.sign(user, JWT_KEY,{
					expiresIn: "24hr",
				});
				const session = user ? await SessionServices.createSession(res, user.id, jwtToken) : null;
				const userDetails = {
					...user,
					...session
				}
				return userDetails
			} else return ResponseService.sendError({message: "Token has expired or has already been verified"}, res);
		}
		 catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}
