import { PrismaClient } from "@prisma/client";
import SessionService from "../../session/service";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";
import HistoryServices, { THistory } from "../service";

export default class HistoryRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createHistory(req, res) {
		try {
			const { job, description } = req.body;
			let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionService.getModelSession(res, token)
      if (session) {
			const history = await HistoryServices.createHistory(
				res,
				session.id,
				job,
				description
			);
			return history;
			}
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}

	static async getHistory(req, res) {
		try {
			let token: string;
			let { modelId } = req.body;
			if (!modelId) {
				const { authorization } = req.headers;
				if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
				const session = await SessionService.getModelSession(res, token)
				modelId = session ? session.id : null;
			}
			const history = await HistoryServices.getHistory(res, ~~modelId);
			return history;
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}

	static async updateHistory(req, res) {
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
			return history;
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}
}
