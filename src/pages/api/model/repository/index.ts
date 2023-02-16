import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseService } from "../../../../services/ResponseService";
import { getUser, getModel } from "helper/util";
import prisma from "lib/prisma";
import ModelServices, { TModel } from "../service";

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
      const user = await getUser(req, res);
      if (user) {
        const model = await ModelServices.createModel(
          res,
          user.id,
          data
        );
        return model;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getModel(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      if (pid == "user") {
        const model = await getModel(req, res);
        return model;
      } else if (pid.length == 25) {
        const model = await ModelServices.getModelByUserId(res, pid as string);
        return model;
      }
      return await ModelServices.getModel(res, ~~pid);
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllModels(res: NextApiResponse<any>) {
		const models = await ModelServices.getAllModels(res);
		return models;
	}

  static async updateModel(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const data = req.body;
      let { pid } = req.query;
      const user = await getUser(req, res);
      if (user) {
        const userId = user.type == "Admin" ? pid : user.id;
        const model = await ModelServices.updateModel(
          res,
          userId as string,
          data
        );
        return model;
      }
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
