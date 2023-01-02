import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

// @ts-ignore
export type TClient = PrismaClient["client"]["create"]["data"];

export default class ClientServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

  static async createClient(
    userId: string,
    companyName: string,
    email: string,
    phone: object,
    social: object,
    state: string,
    country: string,
    address: string
  ) {
    const client = await this.prisma.client.create({
      data: {
        email,
        companyName,
        phone,
        social,
        state,
        country,
        address,
        user: {
          connect: { id: userId },
        },
      },
    });
    return client;
  }


  static async getClient(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    return client;
  }

  static async getAllClients() {
    const client = await this.prisma.client.findMany();
    return client;
  }

  static async updateClient(data: TClient) {
    const updatedClient = await this.prisma.client.update({
      where: { id: data.id },
      data
    });
    return updatedClient;
  }
}