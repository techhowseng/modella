import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModelHistory = PrismaClient["modelHistory"]["create"]["data"];

export default class HistoryServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

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
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }

  static async getHistory(res, modelId: number) {
    try {
      const modelHistory = await this.prisma.modelHistory.findMany({
        where: { modelId: modelId },
      });
      return modelHistory;
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateHistory(res, data: TModelHistory) {
    try {
      const updatedJobHistory = await this.prisma.modelHistory.update({
        where: { id: data.id },
        data
      });
      return updatedJobHistory;
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }
}