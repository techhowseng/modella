import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ContractServices from "../service";
import { ResponseService } from "../../../../services/ResponseService";
import { getClient, getModel } from "helper/util";
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
      const client = await getClient(req, res)
      if (client) {
        delete data.modelId;
        const contract = await ContractServices.createContract(
          res,
          client.id,
          data.modelId,
          data.jobId
        );
        return contract;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateContract(req: any, res: any) {
    try {
      let contractExists;
      let { pid } = req.query;
      let data = req.body;
      if (req.body.agreed) {
        const modelContracts = await ContractServices.getModelContracts(req, res)
        if (modelContracts) {
          contractExists = modelContracts.filter(contract => contract.id === pid).length;
        }
        if (!contractExists) {
          return ResponseService.sendError({
            message: "User is not authorized to update this contract.",
            status: 401
          }, res);
        }
        data = {
          ...req.body,
          agreed: req.body.agreed === "true",
        }
      } else {
        const clientContracts = await ContractServices.getClientContracts(req, res)
        if (clientContracts) {
          contractExists = clientContracts.filter(contract => contract.id === pid).length;
        }
        if (!contractExists) {
          return ResponseService.sendError({
            message: "User is not authorized to update this contract.",
            status: 401
          }, res);
        }
      }
      delete data.pid;
      const contract = await ContractServices.updateContract(res, pid, data);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getContract(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const contract = await ContractServices.getContract(res, pid as string);
      return contract;

    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserContracts(req, res) {
    try {
      let { pid } = req.query;
      let colCheck: string;
      const client = await getClient(req, res);
      const model = await getModel(req, res);
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
