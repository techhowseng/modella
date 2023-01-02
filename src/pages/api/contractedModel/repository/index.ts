import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ContractServices, { TContract } from "../service";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createContract(data: TContract) {
    const contract = await ContractServices.createContract(
      data.clientId,
      data.modelId
    );;
    return contract;
  }

  static async updateContract(id: number) {
    const contract = await ContractServices.updateContract(id);
		return contract;
  }

  static async getContract(id: number) {
    const contract = await ContractServices.getContract(id);
		return contract;
  }

  static async getAllModelContracts(id: number) {
    const contract = await ContractServices.getAllModelContracts(id);
		return contract;
  }

  static async getAllClientContracts(id: number) {
    const contract = await ContractServices.getAllClientContracts(id);
		return contract;
  }
}
