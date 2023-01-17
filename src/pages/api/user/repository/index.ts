import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserServices, { TUser } from "../service";
import { checkExistingUser } from "../helper"
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
      inputs.password = inputs.password;

			const existingEmail = await prisma.user.findFirst({
				where: { email: inputs.email }
			});
			if (Boolean(existingEmail)) {
				return ResponseService.json(
					res,
					new EntityExistsError('user', inputs.email)
				);
			}
			return await UserServices.createUser(
				res,
				inputs.email,
				bcrypt.hashSync(inputs.password, 8)
			);
		} catch(err) {
			return ResponseService.json(res, err);
		}
	}

	static async getUser(req, res) {
		try {		
			const { id } = req.body;
			const user = await UserServices.getUser(id);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async getUserByEmail(req, res) {
		try {
			const { email } = req.body;
			const user = await UserServices.getUserByEmail(email);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async updateUser(req, res) {
		try {
			const { body } = req;
			const user = await UserServices.updateUser(body);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async deleteUser(req, res) {
		try {
			const { id } = req.body;

			const user = await UserServices.deleteUser(id);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async createSession(req, res) {
		try {
			const { body } = req;
			const user = await UserServices.createSession(body);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async getSession(req, res) {
		try {
			const { token } = req.body;
			const user = await UserServices.getSession(token);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async updateSession(req, res) {
		try {
			const { token } = req.body;
			const user = await UserServices.updateSession(token);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async deleteSession(req, res) {
		try {
			const { token } = req.body;
			const user = await UserServices.deleteSession(token);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
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

		}
	}

	static async getVerificationToken(req, res) {
		try {
			const { token } = req.body;
			const user = await UserServices.getVerificationToken(token);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}

	static async deleteVerificationToken(req, res) {
		try {
			const { token } = req.body;

			const user = await UserServices.deleteVerificationToken(token);
			return user;
		} catch (err) {
			return ResponseService.json(res, err);
		}
	}
}
