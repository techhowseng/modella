import { Status, PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import prisma from "lib/prisma";
import { ResponseService } from "../../../../services/ResponseService";

// @ts-ignore
export type TContract = PrismaClient["contract"]["create"]["data"];

export default class ContractServices {
  static prisma: PrismaClient = prisma;

  static async createContract(
    res: NextApiResponse<any>,
    clientId: number,
    modelId: number,
    data: TContract
  ) {
    try {
      const contractedModel = await this.prisma.contract.create({
        data: {
          client: {
            connect: { id: clientId },
          },
          model: {
            connect: { id: modelId },
          },
          ...data
        },
      });
      return contractedModel;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }


  static async getContract(res: NextApiResponse<any>, id: string) {
    try {
      const contractedModel = await this.prisma.contract.findUnique({
        where: { id },
      });
      return contractedModel;

    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateContract(res: NextApiResponse<any>, id: string, data: object) {
    try {
      const updatedContract = await this.prisma.contract.update({
        where: { id },
        data
      });
      return updatedContract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllModelContracts(res: NextApiResponse<any>, id: number) {
    try {
      const modelContracts = await this.prisma.contract.findMany({
        where: { modelId: id },
      });
      return modelContracts;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserContracts(res: NextApiResponse<any>, id: number, col) {
    try {
      const modelContracts = await this.prisma.contract.findMany({
        where: { 
          [col]: id
        },
      });
      return modelContracts;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}