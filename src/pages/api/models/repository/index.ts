import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import { handleQueryObject } from "helper/util";
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
      const { params, page, ...userParams } = req.query;
      if (params == "search"){
        const pageNo = page ?? 1;
        const queries = handleQueryObject(userParams);
        const models = await ModelServices.searchModels(res, queries, ~~pageNo);
        return ResponseService.json(res, 200, "Success", models);
      }
    } catch(err) {
      throw err;
    }
	}

  static async getAllModels(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { page } = req.query;
      const pageNo = page ?? 1;
      const models = await ModelServices.getAllModels(res, pageNo as number);
      return ResponseService.json(res, 200, "Success", models);
    } catch(err) {
      throw err;
    }
	}
}
