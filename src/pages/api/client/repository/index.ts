import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ClientServices, { TClient } from "../service";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createClient(data: TClient) {
    const user = await ClientServices.createClient(
      data.userId,
      data.companyName,
      data.email,
      data.phone,
      data.social,
      data.state,
      data.country,
      data.address
    );;
    return user;
  }

  static async updateClient(data: TClient) {
    const user = await ClientServices.updateClient(data);
		return user;
  }

  static async getClient(id: number) {
    const user = await ClientServices.getClient(id);
		return user;
  }

  static async getAllClients() {
    const user = await ClientServices.getAllClients();
		return user;
  }
}
