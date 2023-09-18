import { Type, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { ResponseService } from "../../../../services/ResponseService";

// @ts-ignore
export type TData = PrismaClient["chat"]["create"]["data"];
// @ts-ignore
export type TAccount = PrismaClient["account"]["create"]["data"];
// @ts-ignore
export type TSession = PrismaClient["session"]["create"]["data"];

export default class ChatServices {
  static prisma: PrismaClient = prisma;

  static async postMessage(
    res,
    id: string,
    data: TData
  ) {
    try {
      const messages = await prisma.messages.create({
        data: {
          ...data,
          chat: {
            connect: { id }
          }
        }
      });
      return messages;
    } catch (err) {
      throw err;
    }
  }

  static async getunreadChats(
    res,
    type: string,
    id: number
  ) {
    try {
      const chat = await prisma.chat.findMany({
        where: {
          [type]: id,
          unread: true
        }
      });
      return chat;
    } catch (err) {
      return ResponseService.sendError(
        { message: "Unable to retrieve chats."},
        res);
    }
  }

  static async getConversationByChatId(res, id: string) {
    try {
      const conversation = await this.prisma.chat.findFirst({
        where: { id },
        include: {
          messages: {
            select: {
              clientMessage: true,
              modelMessage: true,
              createdAt: true
            }
          }
        }
      });
      return conversation;
    } catch (err) {
      throw err;
    }
  }

  static async getOrCreateConversation(res, clientId: number, modelId: number) {
    try {
      const conversation = await this.prisma.chat.upsert({
        where: {
          clientId_modelId: {
            clientId,
            modelId,
          },
        },
        include: {
          messages: {
            select: {
              clientMessage: true,
              modelMessage: true,
              createdAt: true
            }
          }
        },
        update: {},
        create: {
          client: {
            connect: { id: clientId },
          },
          model: {
            connect: { id: modelId },
          },
        }
      });
      return conversation;
    } catch (err) {
      throw err;
    }
  }
}
