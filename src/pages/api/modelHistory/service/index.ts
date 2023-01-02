import { PrismaClient } from "@prisma/client";
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
    modelId: number,
    job: string,
    description: string
  ) {
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
  }


  static async getHistory(modelId: number) {
    const modelHistory = await this.prisma.modelHistory.findMany({
      where: { modelId: modelId },
    });
    return modelHistory;
  }

  static async updateHistory(data: TModelHistory) {
    const updatedJobHistory = await this.prisma.modelHistory.update({
      where: { id: data.id },
      data
    });
    return updatedJobHistory;
  }
}