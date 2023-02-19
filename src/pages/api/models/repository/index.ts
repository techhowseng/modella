import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import { getUser, getModel, handleQueryObject } from "helper/util";
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


	static async getModels(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { params } = req.query;
      let param = req.query;
      if (params == "search"){
        delete param.params;
        const queries = handleQueryObject(param);
        return await ModelServices.searchModels(res, queries);
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

  static async getAllModels(res: NextApiResponse<any>) {
		const models = await ModelServices.getAllModels(res);
		return models;
	}

}
