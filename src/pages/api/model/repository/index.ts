import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ModelServices, { TModel } from "../service";

export default class ModelRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createModel(req, res) {
		const {
      userId,
      email,
      firstname,
      lastname,
      age,
      height,
      DOB,
      social,
      state,
      country,
      address,
      bio
		} = req.body;
		const user = await ModelServices.createModel(
			res,
      userId,
      email,
      firstname,
      lastname,
      age,
      height,
      DOB,
      social,
      state,
      country,
      address,
      bio
    );
		return user;
	}

	static async getModel(req, res) {
		const { id } = req.data;
		const user = await ModelServices.getModel(res, id);
		return user;
	}

  static async getAllModels(res) {
		const user = await ModelServices.getAllModels(res);
		return user;
	}

	static async updateModel(req, res) {
		const { data } = req.body
			const user = await ModelServices.updateModel(res,data);
			return user;
	}
}
