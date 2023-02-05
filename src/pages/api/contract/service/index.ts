import { Status, PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TContract = PrismaClient["contract"]["create"]["data"];

export default class ContractServices {
  static prisma: PrismaClient = prisma;

  static async createContract(
    res,
    clientId: number,
    modelId: number,
    locations: object,
    startDate: string,
    startTime: string,
    hours: string,
    days: string,
    fee: string,
    status: Status
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
          locations, startDate, startTime, hours, days, fee, status
        },
      });
      return contractedModel;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }


  static async getContract(res, id: number) {
    try {
      const contractedModel = await this.prisma.contract.findUnique({
        where: { id },
      });
      return contractedModel;

    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateContract(res, id: number, data: object) {
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

  static async getAllModelContracts(res, id: number) {
    try {
      const modelContracts = await this.prisma.contract.findMany({
        where: { modelId: id },
      });
      return modelContracts;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserContracts(res, id: number, col) {
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