import { Types, PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
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

  static async dynamicDelete(res: NextApiResponse<any>, id: string, table) {
    try {
      const deleted = await this.prisma?.[table].delete({
        where: { id }
      });
      return deleted;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

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
}
