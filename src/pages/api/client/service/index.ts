import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
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
    res,
    userId: string,
    companyName: string,
    email: string,
    phone: object,
    social: object,
    state: string,
    country: string,
    address: string
  ) {
    try {
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
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }


  static async getClient(res, id: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });
      return client;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllClients(res) {
    try {
      const client = await this.prisma.client.findMany();
      return client;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateClient(res, data: TClient) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { id: data.id },
        data
      });
      return updatedClient;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }
}