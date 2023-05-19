import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TClient = PrismaClient["client"]["create"]["data"];

export default class ClientServices {
  static prisma: PrismaClient = prisma;

  static async createClient(res: any, userId: string, data: TClient) {
    try {
      const client = await this.prisma.client.create({
        data: {
          ...data,
          user: {
            connect: { id: userId },
          },
        },
      });
      return client;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getClient(res: any, id: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              email: true,
              type: true
            }
          }
        }
      })
      return (({ user, ...client }) => ({ ...user, ...client }))(client);
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClients(res: any) {
    try {
      const clients = await this.prisma.client.findMany();
      console.log("clients------", clients)
      return clients;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateClient(res: any, userId: string, data: TClient) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { userId },
        data,
      });
      return updatedClient;
    } catch (err) {
      return ResponseService.sendError(
        { message: "There was an error updating the client information." },
        res
      );
    }
  }
}
