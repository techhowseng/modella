import { Types, PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async createModel(res: any, id: string, data: TModel) {
    try {
      const model = await this.prisma.model.create({
        data: {
          ...data,
          user: {
            connect: { id },
          },
        },
      });
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

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

  static async getModelByUserId(res, userId: string) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { userId },
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

  static async updateModel(res, userId, data) {
    try {
      const updatedModel = await this.prisma.model.update({
        where: { userId },
        data,
      });
      return updatedModel;
    } catch (err) {
      return ResponseService.sendError(
        { message: "Error updating models information." },
        res
      );
    }
  }
}
