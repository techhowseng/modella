import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

// @ts-ignore
export type TModel = PrismaClient["model"]["create"]["data"];

export default class UserServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

  static async createModel(
    userId: string,
    email: string,
    firstname: string,
    lastname: string,
    age: number,
    height: string,
    DOB: string,
    social: object,
    state: string,
    country: string,
    address: string,
    bio: string
  ) {
    const model = await this.prisma.model.create({
      data: {
        email,
        firstname,
        lastname,
        age,
        height,
        DOB,
        social,
        state,
        country,
        address,
        bio,
        user: {
          connect: { id: userId },
        },
      },
    });
    return model;
  }


  static async getModel(id: number) {
    const model = await this.prisma.model.findUnique({
      where: { id },
    });
    return model;
  }

  static async getAllModels() {
    const model = await this.prisma.model.findMany();
    return model;
  }

  static async updateModel(data: TModel) {
    const updatedModel = await this.prisma.model.update({
      where: { id: data.id },
      data
    });
    return updatedModel;
  }
}