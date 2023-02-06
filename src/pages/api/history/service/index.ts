import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type THistory = PrismaClient["history"]["create"]["data"];

export default class HistoryServices {
  static prisma: PrismaClient = prisma;

  static async createHistory(
    res,
    modelId: number,
    job: string,
    description: string
  ) {
    try {
      const history = await this.prisma.history.create({
        data: {
          job,
          description,
          model: {
            connect: { id: modelId },
          }
        },
      });
      return history;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getHistory(res, modelId: number) {
    try {
      const modelHistory = await this.prisma.history.findMany({
        where: { modelId },
      });
      return modelHistory;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateHistory(res, id: number, data: THistory) {
    try {
      const updatedJobHistory = await this.prisma.history.update({
        where: { id },
        data
      });
      return updatedJobHistory;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}