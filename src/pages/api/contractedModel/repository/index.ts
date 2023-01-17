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
      const { clientId, modelId } = req.body;
      const contract = await ContractServices.createContract(
        res,
        clientId,
        modelId
      );
      return contract;
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateContract(req, res) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.updateContract(res, id);
      return contract;

    } catch(err) {

    }
  }

  static async getContract(req, res) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.getContract(res, id);
      return contract;

    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllModelContracts(req, res) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.getAllModelContracts(res, id);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllClientContracts(req, res) {
    try {
      const { id } = req.body;
      const contract = await ContractServices.getAllClientContracts(res, id);
      return contract;

    } catch(err) {
      return ResponseService.json(res, err);
    }
  }
}
