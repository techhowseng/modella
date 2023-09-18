import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import { TWENTY_FOUR_HOURS_FROM_NOW } from "helper/constants";
import prisma from "lib/prisma";
import ClientAside from "features/ClientAccount/Components/ClientAside";

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
        update: {
          expires: TWENTY_FOUR_HOURS_FROM_NOW,
        },
        create: {
          sessionToken,
          expires: TWENTY_FOUR_HOURS_FROM_NOW,
          user: {
            connect: { id },
          },
        },
      });
      return session;
    } catch (err) {
      throw err;
    }
  }

  static async getSession(res: any, sessionToken: string | null) {
    try {
      if (!sessionToken) return null;
      const session = await this.prisma.session
        .findUnique({
          where: { sessionToken },
        })
        .user();
      return session;
    } catch (err) {
      throw {
        message: "There was an error retrieving the token details",
      };
    }
  }

  static async getClientSession(res: any, sessionToken: string | null) {
    try {
      if (!sessionToken) return null;
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: {
              client: true,
            },
          },
        },
      });
      if (!session) return null;
      return (({ email, type, client }) => ({ email, type, ...client }))(
        session.user
      );
    } catch (err) {
      throw { message: "There was an error retrieving the token details" };
    }
  }

  static async getModelOrClient(res: any, sessionToken: string | null) {
    try {
      if (!sessionToken) return null;
      const session = await this.prisma.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: {
              model: true,
              client: true,
            },
          },
        },
      });
      if (!session) return null;
      return (({ id: userId, email, type, model, client }) => ({
        userId,
        email,
        type,
        ...model,
        ...client,
      }))(session.user);
    } catch (err) {
      throw { message: "The user does not have an associated model." };
    }
  }

  static async updateSession(res: any, session: TSession, force?: boolean) {
    try {
      const expires = TWENTY_FOUR_HOURS_FROM_NOW;
      const updatedSession = await this.prisma.session.update({
        where: { id: session.id },
        data: {
          expires,
        },
      });
      return updatedSession;
    } catch (err) {
      throw { message: "Error updating token expiry." };
    }
  }

  static async deleteSession(res, sessionToken: string) {
    try {
      const session = await this.prisma.session.delete({
        where: { sessionToken },
      });
      return session;
    } catch (err) {
      throw { message: "Token does not exist." };
    }
  }
}
