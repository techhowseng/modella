import { Types, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async getModel(res: NextApiResponse<any>, id: number) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { id },
      });
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllModels(res: NextApiResponse<any>, page: number) {
    try {
      const model = await this.prisma.model.findMany({
        take: 10,
        skip: 10 * (page - 1)
      });
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async searchModels(res: any, query: object, page: number) {
    try {
      const models = await this.prisma.model.findMany({
        take: 10,
        skip: 10 * (page - 1),
        where: query
      });
      return models;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

}
