import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";
import ContractServices, { TContract } from "../service";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createContract(req, res) {
    try {
      const { clientId, modelId, locations, startDate, startTime, hours, days, fee, status } = req.body;
      const contract = await ContractServices.createContract(
        res,
        clientId,
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
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateContract(req, res) {
    try {
      const { body } = req;
      const contract = await ContractServices.updateContract(res, body.id, body);
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

  static async getAllModelContracts(req, res) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.getAllModelContracts(res, id);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClientContracts(req, res) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.getAllClientContracts(res, id);
      return contract;

    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
