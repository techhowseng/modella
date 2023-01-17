import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import HistoryServices, { TModelHistory } from "../service";

export default class HistoryRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createHistory(req, res) {
		const { modelId, job, description } = req.body;
		const user = await HistoryServices.createHistory(
			res,
      modelId,
      job,
      description
    );
		return user;
	}

	static async getHistory(req, res) {
		const { id } = req.body;
		const user = await HistoryServices.getHistory(res, id);
		return user;
	}

	static async updateHistory(req, res) {
		const { body } = req;
			const user = await HistoryServices.updateHistory(res, body);
			return user;
	}
}
