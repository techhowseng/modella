import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { ResponseService } from "../../../../services/ResponseService";
import { getToken } from "helper/util";

// @ts-ignore
export type TContract = PrismaClient["contract"]["create"]["data"];

export default class ContractServices {
  static prisma: PrismaClient = prisma;

  static async createContract(
    res: NextApiResponse<any>,
    clientId: number,
    modelId: number,
    jobId: string
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
          job: {
            connect: { id: jobId },
          },
        },
      });
      return contractedModel;
    } catch(err) {
      throw err;
    }
  }


  static async getContract(res: NextApiResponse<any>, id: string) {
    try {
      const contractedModel = await this.prisma.contract.findUnique({
        where: { id },
      });
      return contractedModel;

    } catch(err) {
      throw err;
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
      throw err;
    }
  }

  static async getAllModelContracts(res: NextApiResponse<any>, id: number) {
    try {
      const modelContracts = await this.prisma.contract.findMany({
        where: { modelId: id },
      });
      return modelContracts;
    } catch(err) {
      throw err;
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
      throw err;
    }
  }

  static async getModelContracts(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const sessionToken = getToken(req);
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
        select: {
          user: {
            select: {
              model: {
                select: {
                  contracts: {
                    select: {
                      id: true
                    }
                  }
                }
              }
            }
          }
        }
      })
      const contractsArray = session?.user?.model?.contracts
      return contractsArray;
    } catch(err) {
      throw err;
    }
  }

  static async getClientContracts(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const sessionToken = getToken(req);
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
        select: {
          user: {
            select: {
              client: {
                select: {
                  contracts: {
                    select: {
                      id: true
                    }
                  }
                }
              }
            }
          }
        }
      })
      const contractsArray = session?.user?.client?.contracts
      return contractsArray;
    } catch(err) {
      throw err;
    }
  }
}