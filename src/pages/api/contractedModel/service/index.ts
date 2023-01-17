import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
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
    res,
    clientId: number,
    modelId: number
  ) {
    try {
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

    } catch(err) {
      return ResponseService.json(res, err);
    }
  }


  static async getContract(res, id: number) {
    try {
      const contractedModel = await this.prisma.contractedModel.findUnique({
        where: { id },
      });
      return contractedModel;

    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateContract(res, id: number) {
    try {
      const updatedContract = await this.prisma.contractedModel.update({
        where: { id },
        data: {
          status: "DONE"
        }
      });
      return updatedContract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllModelContracts(res, id: number) {
    try {
      const modelContracts = await this.prisma.contractedModel.findMany({
        where: { modelId: id },
      });
      return modelContracts;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllClientContracts(res, id: number) {
    try {
      const modelContracts = await this.prisma.contractedModel.findMany({
        where: { clientId: id },
      });
      return modelContracts;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }
}