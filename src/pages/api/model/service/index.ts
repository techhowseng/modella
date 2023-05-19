import { Types, PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import { NextApiResponse } from "next";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async createModel(res: any, id: string, data: TModel) {
    try {
      const model = await this.prisma.model.create({
        data: {
          ...data,
          user: {
            connect: { id },
          },
        },
      });
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getModel(res: NextApiResponse<any>, id: number) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              email: true,
              type: true,
            },
          },
        },
      });
      return (({ user, ...model }) => ({ ...user, ...model }))(model);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getModelByUserId(res: NextApiResponse<any>, userId: string) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              email: true,
              type: true,
              Media: true,
            },
          },
        },
      });
      return (({ user, ...model }) => ({ ...user, ...model }))(model);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllModels(res: NextApiResponse<any>) {
    try {
      const model = await this.prisma.model.findMany();
      return model;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateModel(
    res: NextApiResponse<any>,
    userId: string,
    data: any
  ) {
    ["shoeSize", "bust", "height", "waist", "hip"].filter((item) => {
      if (Number(data[item])) {
        data[item] = parseInt(data[item], 10);
      }
    });

    try {
      const updatedModel = await this.prisma.model.update({
        where: { userId },
        data,
      });
      return updatedModel;
    } catch (err) {
      return ResponseService.sendError(
        { message: "Error updating models information." },
        res
      );
    }
  }

  static async uploadThumbnail(
    res: NextApiResponse<any>,
    userId: string,
    thumbnailURL: string = null,
    thumbnailPublicId: string = null
  ) {
    try {
      const updatedModel = await this.prisma.model.update({
        where: { userId },
        data: {
          thumbnailURL,
          thumbnailPublicId,
        },
      });
      return updatedModel;
    } catch (err) {
      return ResponseService.sendError(
        { message: "Error updating models thumbnail." },
        res
      );
    }
  }
}
