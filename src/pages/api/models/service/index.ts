import { Types, PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async getModel(res, id: number) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { id },
      });
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllModels(res) {
    try {
      const model = await this.prisma.model.findMany();
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async searchModels(res: any, query) {
    console.log("query-----", query)
    try {
      const models = await this.prisma.model.findMany({
        where: query
      });
      return models;
    } catch (err) {
      console.log("err--------", err)
      return ResponseService.sendError(err, res);
    }
  }

}
