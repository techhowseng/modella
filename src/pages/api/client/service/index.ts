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
      throw err;
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
      if (!client) { 
        return ResponseService.sendError(
          { message: "A client with this ID does not exist." },
          res
        );
      }
      return (({ user, ...client }) => ({ ...user, ...client }))(client);
    } catch(err) {
      throw err;
    }
  }

  static async getAllClients(res: any) {
    try {
      const clients = await this.prisma.client.findMany();
      return clients;
    } catch (err) {
      throw err;
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
