import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ContractServices, { TContract } from "../service";
import { ResponseService } from "helper/ResponseService";
import SessionServices from "../../session/service";
import { getClient, getModel, getUser } from "helper/util";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createContract(req, res) {
    try {
      const { modelId, locations, startDate, startTime, hours, days, fee, status } = req.body;
      let token;
      const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionServices.getClientSession(res, token)
      if (session) {
        const contract = await ContractServices.createContract(
          res,
          session.id,
          modelId,
          locations,
          startDate,
          startTime,
          hours,
          days,
          fee,
          status
        );
        return contract;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateContract(req, res) {
    try {
      let { pid } = req.query;
      const contract = await ContractServices.updateContract(res, pid, req.body);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getContract(req, res) {
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
      const user = await getUser(req);
      if (user && user.type != "Admin") {
        const client = await getClient(req);
        const model = await getModel(req);
        if (client) {
          pid = client["id"];
          colCheck = "clientId";
        } else {
          pid = model["id"];
          colCheck = "modelId";
        }
      }
      const contract = await ContractServices.getUserContracts(res, pid, colCheck);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
