import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserServices, { TUser } from "../service";
import SessionServices from "../../session/service";
import { randomStringGenerator } from "../../../../helper/util";
import { checkExistingUser, existsInDB } from "../helper"
import { ResponseService } from "../../../../helper/ResponseService";
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
				where: { email: inputs.email }
			});
			if (Boolean(existingEmail)) {
				return ResponseService.json(
					res,
					new EntityExistsError('user', inputs.email)
				);
			}

			const newUser = await UserServices.createUser(
				res,
				inputs.email,
				bcrypt.hashSync(inputs.password, 8),
				inputs.type
			);

			let newVerification;
			if (newUser) {
				const verificationToken = randomStringGenerator();
				newVerification = await UserServices.createVerificationToken(
					newUser.id,
					verificationToken
				);
			}
			let responseObj = {
				...newUser,
				...newVerification
			}
      return ResponseService.json(
				res,
				200,
				'Please verify your email address within 10 minutes', 
				responseObj
			);
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async updateUser(req, res) {
		try {
			const { id, email, password, type } = req.body;
			const emailLowercase = email.toLowerCase();
			const passwordEncrypt = bcrypt.hashSync(password, 8)
			const user = await UserServices.updateUser(res, id, emailLowercase, passwordEncrypt, type);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async getUser(req, res) {
		try {		
			const { id } = req.body;
			const user = await UserServices.getUser(res, id);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async getUserByEmail(req, res) {
		try {
			const { email } = req.body;
			const user = await UserServices.getUserByEmail(res, email);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async deleteUser(req, res) {
		try {
			const { id } = req.body;

			const user = await UserServices.deleteUser(id);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async getSession(req, res) {
		try {
			const { token } = req.body;
			const user = await SessionServices.getSession(res, token);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async updateSession(req, res) {
		try {
			const { token } = req.body;
			const user = await SessionServices.updateSession(res, token);
			return user;
		} catch(err) {
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
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async getVerificationToken(req, res) {
		try {
			const { token } = req.body;
			const user = await UserServices.getVerificationToken(token);
			return user;
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async verifyUser(req, res) {
		try {
			const { verifyToken, email } = req.body;
			let userDetails = {};
			const verifiedUser = await UserServices.verifyToken(res, verifyToken, email);
			if (verifiedUser) {
				const user = await UserServices.verifyUser(res, email);
				await UserServices.deleteVerificationToken(res, email);
				const jwtToken = jwt.sign(user, JWT_KEY,{
					expiresIn: 31556926, // 1 year in seconds
				});
        const session = user ? await SessionServices.createSession(res, user.id, jwtToken) :  "";
				userDetails = {
					...user,
					...session
				}
			return userDetails
			}
		} catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}
