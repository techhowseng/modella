import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModelHistory = PrismaClient["modelHistory"]["create"]["data"];

export default class HistoryServices {
  static prisma: PrismaClient = prisma;

  static async createHistory(
    res,
    modelId: number,
    job: string,
    description: string
  ) {
    try {
      const modelHistory = await this.prisma.modelHistory.create({
        data: {
          job,
          description,
          model: {
            connect: { id: modelId },
          }
        },
      });
      return modelHistory;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getHistory(res, modelId: number) {
    try {
      const modelHistory = await this.prisma.modelHistory.findMany({
        where: { modelId },
      });
      return modelHistory;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateHistory(res, id: number, data: TModelHistory) {
    try {
      const updatedJobHistory = await this.prisma.modelHistory.update({
        where: { id },
        data
      });
      return updatedJobHistory;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}