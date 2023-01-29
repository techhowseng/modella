import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TSession = PrismaClient["session"]["create"]["data"];

export default class SessionServices {
  static prisma: PrismaClient = prisma;

  static async createSession(res, id: string, sessionToken: string) {
    try {
      const session = await this.prisma.session.upsert({
        where: {
          sessionToken,
        },
        update: {},
        create: {
          sessionToken,
          expires: new Date(),
          user: {
            connect: { id },
          },
        },
      })
      return session;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getSession(res, sessionToken: string | null) {
    try {
      if (!sessionToken) return null;
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
      }).user();
      return session;
    } catch(err) {
      return ResponseService.sendError({message: "There was an error retrieving the token details"}, res);
    }
  }

  static async getClientSession(res, sessionToken: string | null) {
    try {
      if (!sessionToken) return null;
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
      }).user().client();
      return session;
    } catch(err) {
      return ResponseService.sendError({message: "There was an error retrieving the token details"}, res);
    }
  }

  static async getModelSession(res, sessionToken: string | null) {
    try {
      if (!sessionToken) return null;
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
      }).user().model();
      return session;
    } catch(err) {
      return ResponseService.sendError({message: "There was an error retrieving the token details"}, res);
    }
  }

  static async updateSession(res, session: TSession, force?: boolean) {
    try {
      const expires = new Date();
      const updatedSession = await this.prisma.session.update({
        where: { id: session.id },
        data: {
          expires,
        },
      });
      return updatedSession;
    } catch(err){
      return ResponseService.sendError({message: "Error updating token expiry."}, res);
    }
  }


  static async deleteSession(res, sessionToken: string) {
    try {
      const session = await this.prisma.session.delete({
        where: { sessionToken},
      });
      return session;
    } catch(err) {
      return ResponseService.sendError({message: "Token does not exist."}, res);
    }
  }
}