import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TClient = PrismaClient["client"]["create"]["data"];

export default class ClientServices {
  static prisma: PrismaClient = prisma;

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
      return ResponseService.sendError(err, res);
    }
  }


  static async getClient(res, id: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });
      return client;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClients(res) {
    try {
      const client = await this.prisma.client.findMany();
      return client;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateClient(res, userId, data: TClient) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { userId},
        data
      });
      return updatedClient;
    } catch(err) {
      console.log("err------", err)
      return ResponseService.sendError({message: "There was an error updating the client information."}, res);
    }
  }
}