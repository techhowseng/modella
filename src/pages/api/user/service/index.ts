import { Type, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { ResponseService } from "../../../../services/ResponseService";
import {
  TEN_MINUTES_FROM_NOW,
  TWENTY_FOUR_HOURS_FROM_NOW
} from "../../../../helper/constants";

// @ts-ignore
export type TUser = PrismaClient["user"]["create"]["data"];
// @ts-ignore
export type TAccount = PrismaClient["account"]["create"]["data"];
// @ts-ignore
export type TSession = PrismaClient["session"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async createUser(
    res,
    email: string,
    password: string,
    type: Type,
    isAuthenticated: boolean
  ) {
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password,
          type,
          isAuthenticated
        }
      });
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUser(res, id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserByEmail(res, email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
      });
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateUser(res: any, id: string, data: TUser) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data
      });
      return updatedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteUser(userId: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isDeleted: true,
      },
    });
    return user;
  }

  static async linkAccount(
    userId: string,
    provider: string,
    type: string,
    providerAccountId: string,
    refreshToken: string,
    accessToken: string,
    accessTokenExpires: Date | null
  ) {
    const account = await this.prisma.account.create({
      data: {
        provider,
        type,
        providerAccountId,
        refresh_token: refreshToken,
        access_token: accessToken,
        // @ts-ignore
        expires_at: accessTokenExpires,
        user: {
          connect: { id: userId },
        },
      },
    });
    return account;
  }

  //   async unlinkAccount(
  //     userId: string | number,
  //     provider: string,
  //     providerAccountId: string
  //   ) {
  //     const account = await this.prisma.account.delete({
  //       where: {
  //         providerAccountId,
  //       },
  //     });
  //     return account;
  //   }


  static async createVerificationToken(
    data: TUser,
    token: string,
  ) {
    const verificationToken = await this.prisma.verificationToken.create({
      data: {
        email: data.email,
        password: data.password,
        type: data.type,
        token,
        expires: TEN_MINUTES_FROM_NOW,
      },
    });
    return verificationToken;
  }

  static async getVerificationToken(token: string) {
    const verificationToken = await this.prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  }

  static async deleteVerificationToken(res: any, email: string) {
    try {
      const deleteVerifications = await prisma.verificationToken.deleteMany({
        where: { email },
      })
      return deleteVerifications;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async verifyToken(res: any, token: string) {
    try {
      const verifiedUser = await this.prisma.verificationToken.findFirst({
        where: {
          token,
          expires: {
            gte: new Date(),
          },
        },
      });
      return verifiedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
