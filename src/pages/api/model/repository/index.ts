import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ModelServices, { TModel } from "../service";

export default class ModelRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createModel(data: TModel) {
		const user = await ModelServices.createModel(
      data.userId,
      data.email,
      data.firstname,
      data.lastname,
      data.age,
      data.height,
      data.DOB,
      data.social,
      data.state,
      data.country,
      data.address,
      data.bio
    );
		return user;
	}

	static async getModel(id: number) {
		const user = await ModelServices.getModel(id);
		return user;
	}

  static async getAllModels() {
		const user = await ModelServices.getAllModels();
		return user;
	}

	static async updateModel(data: TModel) {
			const user = await ModelServices.updateModel(data);
			return user;
	}
}
