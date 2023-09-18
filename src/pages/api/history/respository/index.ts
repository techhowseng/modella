import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import { getModelOrClient } from "helper/util";
import HistoryServices, { THistory } from "../service";
import { NextApiRequest, NextApiResponse } from "next";

export default class HistoryRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createHistory(req: NextApiRequest, res: NextApiResponse<any>) {
		try {
			const { job, description } = req.body;
			const model =  await getModelOrClient(req, res)
      if (model) {
			const history = await HistoryServices.createHistory(
				res,
				model.id,
				job,
				description
			);
			return ResponseService.json(res, 200, "Success", history);
			}
			return ResponseService.sendError({ message: "Token does not exist on database." }, res);
		} catch(err) {
      throw err;
		}
	}

	static async getHistory(req: NextApiRequest, res: NextApiResponse<any>) {
		try {
			const model = await getModelOrClient(req, res)
			const history = await HistoryServices.getHistory(res, ~~model.id);
			return ResponseService.json(res, 200, "Success", history);
		} catch(err) {
      throw err;
		}
	}

	static async updateHistory(req: NextApiRequest, res: NextApiResponse<any>) {
		interface Input {
			job?: string,
			description?: string,
		}
		try {
			const { pid } = req.query;
			let input: Input = {}
			req.body.job ? input.job = req.body.job : null;
			req.body.description ? input.description = req.body.description : null;
			const history = await HistoryServices.updateHistory(res, ~~pid, input);
			return ResponseService.json(res, 200, "Success", history);
		} catch(err) {
      throw err;
		}
	}
}
