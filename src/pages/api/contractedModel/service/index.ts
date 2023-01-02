import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

// @ts-ignore
export type TContract = PrismaClient["contractedModel"]["create"]["data"];

export default class ContractServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

  static async createContract(
    clientId: number,
    modelId: number
  ) {
    const contractedModel = await this.prisma.contractedModel.create({
      data: {
        client: {
          connect: { id: clientId },
        },
        model: {
          connect: { id: modelId },
        }
      },
    });
    return contractedModel;
  }


  static async getContract(id: number) {
    const contractedModel = await this.prisma.contractedModel.findUnique({
      where: { id },
    });
    return contractedModel;
  }

  static async updateContract(id: number) {
    const updatedContract = await this.prisma.contractedModel.update({
      where: { id },
      data: {
        status: "DONE"
      }
    });
    return updatedContract;
  }

  static async getAllModelContracts(id: number) {
    const modelContracts = await this.prisma.contractedModel.findMany({
      where: { modelId: id },
    });
    return modelContracts;
  }

  static async getAllClientContracts(id: number) {
    const modelContracts = await this.prisma.contractedModel.findMany({
      where: { clientId: id },
    });
    return modelContracts;
  }
}