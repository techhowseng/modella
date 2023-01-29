import { Types, PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async createModel(
    res,
    userId: string,
    email: string,
    firstname: string,
    lastname: string,
    height: string,
    bust: string,
    waist: string,
    hip: string,
    shoeSize: string,
    weight: string,
    complexion: string,
    DOB: string,
    social: object,
    state: string,
    country: string,
    phone: object,
    address: string,
    isAvailable: boolean,
    types: Types,
    bio: string,
  ) {
    try {
      const model = await this.prisma.model.create({
        data: {
          email,
          firstname,
          lastname,
          height,
          bust,
          waist,
          hip,
          shoeSize,
          weight,
          complexion,
          DOB,
          social,
          state,
          country,
          phone,
          address,
          isAvailable,
          types,
          bio,
          user: {
            connect: { id: userId },
          },
        },
      });
      return model;
    } catch(err) {
      console.log("err-----------", err)
      return ResponseService.sendError(err, res);
    }
  }


  static async getModel(res, id: number) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { id },
      });
      return model;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllModels(res) {
    try {
      const model = await this.prisma.model.findMany();
      return model;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateModel(res, userId, data) {
    try {
      const updatedModel = await this.prisma.model.update({
        where: { userId },
        data
      });
      return updatedModel;
    } catch(err) {
      return ResponseService.sendError({message: "Error updating models information."}, res);
    }
  }
}