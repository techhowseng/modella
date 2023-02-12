import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import { getUser } from "helper/util";
import SessionService from "../../session/service";
import prisma from "lib/prisma";
import ModelServices, { TModel } from "../service";
import { NextApiRequest, NextApiResponse } from "next";

// @ts-ignore
export type TUser = PrismaClient["session"]["create"]["data"];

export default class ModelRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createModel(req: NextApiRequest, res: NextApiResponse<any>) {
		const data = req.body;
    try {
      const session = await getUser(req);
      if (session) {
        const user = await ModelServices.createModel(
          res,
          session.id,
          data
        );
        return user;
      }
    } catch(err) {
      console.log('err >>> ', err);
      return ResponseService.sendError(err, res);
    }
	}

	static async getModel(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const user = await ModelServices.getModel(res, ~~pid);
      return user;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

  static async getAllModels(res: NextApiResponse<any>) {
		const user = await ModelServices.getAllModels(res);
		return user;
	}

	static async updateModel(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const data = req.body
      let { pid } = req.query;
      const user = await getUser(req);
      if (user) {
        const userId = user.type == "Admin" ? pid : user.id
        const model = await ModelServices.updateModel(res, userId, data);
        return model;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}
