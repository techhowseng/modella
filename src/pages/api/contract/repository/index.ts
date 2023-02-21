import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ContractServices, { TContract } from "../service";
import { ResponseService } from "../../../../services/ResponseService";
import { getClient, getModel, getUser } from "helper/util";
import { NextApiRequest, NextApiResponse } from "next";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createContract(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const data = req.body;
      const client = await getClient(req)
      if (client) {
        delete data.modelId;
        const contract = await ContractServices.createContract(
          res,
          client.id,
          req.body.modelId,
          data
        );
        return contract;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateContract(req: any, res: any) {
    try {
      let { pid } = req.query;
      const contract = await ContractServices.updateContract(res, pid, req.body);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getContract(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.getContract(res, ~~id);
      return contract;

    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserContracts(req, res) {
    try {
      let { pid } = req.query;
      let colCheck: string;
      const client = await getClient(req);
      const model = await getModel(req);
      if (client) {
        pid = client.id;
        colCheck = "clientId";
      } else {
        pid = model.id;
        colCheck = "modelId";
      }
      const contract = await ContractServices.getUserContracts(res, pid, colCheck);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
