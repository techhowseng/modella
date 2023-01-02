import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

// @ts-ignore
export type TUser = PrismaClient["user"]["create"]["data"];
// @ts-ignore
export type TAccount = PrismaClient["account"]["create"]["data"];
// @ts-ignore
export type TSession = PrismaClient["session"]["create"]["data"];

export default class UserServices {
  static prisma: PrismaClient = prisma;

  static async createUser(data: TUser) {
    const user = await prisma.user.create(data);
    return user;
  }

  static async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  static async getUserByEmail(email?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  static async updateUser(data: TUser) {
    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        emailVerified: data.emailVerified || null,
      },
    });
    return updatedUser;
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

  static async createSession(user: TUser) {
    const session = await this.prisma.session.create({
      //  @ts-ignore
      data: {
        expires: new Date(),
        user: {
          connect: { id: user.id },
        },
      },
    });
    return session;
  }

  static async getSession(sessionToken: string | null) {
    if (!sessionToken) return null;
    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });
    return session;
  }

  static async updateSession(session: TSession, force?: boolean) {
    const expires = new Date();
    const updatedSession = await this.prisma.session.update({
      where: { id: session.id },
      data: {
        expires,
      },
    });
    return updatedSession;
  }

  static async deleteSession(sessionToken: string) {
    const session = await this.prisma.session.delete({
      where: { sessionToken },
    });
    return session;
  }

  static async createVerificationToken(
    identifier: string,
    token: string,
  ) {
    const verificationToken = await this.prisma.verificationToken.create({
      data: {
        identifier,
        token,
        expires: new Date(),
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

  static async deleteVerificationToken(token: string) {
    const verificationToken = await this.prisma.verificationToken.delete({
      where: { token },
    });
    return verificationToken;
  }
}
