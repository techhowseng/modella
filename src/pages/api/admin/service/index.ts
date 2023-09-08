import { Types, PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["admin"]["create"]["data"];

export default class AdminServices {
  static prisma: PrismaClient = prisma;

  static async disableUser(res: NextApiResponse<any>, id: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          isDeleted: true
        }
      });
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  // static async dynamicDelete(res: NextApiResponse<any>, id: string, table) {
  //   try {
  //     const deleted = await this.prisma?.[table].delete({
  //       where: { id }
  //     });
  //     return deleted;
  //   } catch (err) {
  //     return ResponseService.sendError(err, res);
  //   }
  // }

  static async vetClientById(res: NextApiResponse<any>, id: number) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { id },
        data: {
          isVetted: true
        }
      });
      return updatedClient;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async vetClientByuser(res: NextApiResponse<any>, userId: string) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { userId },
        data: {
          isVetted: true
        }
      });
      return updatedClient;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteUserMedia(res: NextApiResponse<any>, userId: string) {
    try {
      const deletedUserMedia = await this.prisma.media.deleteMany({
        where: { userId }
      });
      return deletedUserMedia;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getModelFromUserId(res: NextApiResponse<any>, id: string, includeRelation) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id },
        select: {
          [includeRelation]: {
            select: {
              id: true
            }
          }
        }
      });
      return data;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getModelData(res: NextApiResponse<any>, id: string, includeRelation) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id },
        include: {
          model: true
        }
      });
      return data;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUsersContracts(res: NextApiResponse<any>, id: number, type: string) {
    const key = `${type}Id`;
    try {
      const usersContracts = await this.prisma.contract.findMany({
        where: { 
          [key]: id
         }
      });
      return usersContracts;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
