import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import UserServices, { TUser } from "../service";

export default class UserRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createUser(data: TUser) {
		const user = await UserServices.createUser(data);
		return user;
	}

	static async getUser(id: string) {
		const user = await UserServices.getUser(id);
		return user;
	}

	static async getUserByEmail(email: string) {
		const user = await UserServices.getUserByEmail(email);
		return user;
	}

	static async updateUser(data: TUser) {
			const user = await UserServices.updateUser(data);
			return user;
	}

	static async deleteUser(id: string) {
		const user = await UserServices.deleteUser(id);
		return user;
	}

	static async createSession(data: TUser) {
		const user = await UserServices.createSession(data);
		return user;
	}

	static async getSession(token: string) {
		const user = await UserServices.getSession(token);
		return user;
	}

	static async updateSession(token: string) {
		const user = await UserServices.updateSession(token);
		return user;
	}

	static async deleteSession(token: string) {
		const user = await UserServices.deleteSession(token);
		return user;
	}

	static async createVerificationToken(
		identifier: string,
		token: string
		) {
		const user = await UserServices.createVerificationToken(
				identifier,
				token
		);
		return user;
	}

	static async getVerificationToken(token: string) {
		const user = await UserServices.getVerificationToken(token);
		return user;
	}

	static async deleteVerificationToken(token: string) {
		const user = await UserServices.deleteVerificationToken(token);
		return user;
	}
}
