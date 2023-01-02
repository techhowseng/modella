import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import HistoryServices, { TModelHistory } from "../service";

export default class HistoryRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createHistory(data: TModelHistory) {
		const user = await HistoryServices.createHistory(
      data.modelId,
      data.job,
      data.description
    );
		return user;
	}

	static async getHistory(id: number) {
		const user = await HistoryServices.getHistory(id);
		return user;
	}

	static async updateHistory(data: TModelHistory) {
			const user = await HistoryServices.updateHistory(data);
			return user;
	}
}
