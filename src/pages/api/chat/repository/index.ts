import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import ChatServices from "../service";
import { ResponseService } from "../../../../services/ResponseService";
import { NextApiRequest, NextApiResponse } from "next";
import { getModelOrClient } from "helper/util";
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;

export default class ChatRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async getNewMessagesNotifications(req: NextApiRequest, res) {
    try {
      const user = await getModelOrClient(req, res);
      if (user.type == "Model") {
        const unreadChats = await ChatServices.getunreadChats(res, "modelId", ~~user.id);
        return ResponseService.json(res, 200, "Success", unreadChats);
      } else {
        const unreadChats = await ChatServices.getunreadChats(res, "clientId", ~~user.id);
        return ResponseService.json(res, 200, "Success", unreadChats);
      }
    } catch (err) {
      throw err;
    }
  }

  static async initiateOrGetConversation(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const  { chatId, modelId, clientId } = req.body;
      if (chatId) return await ChatServices.getConversationByChatId(res, chatId);
      const conversation = await ChatServices.getOrCreateConversation(res, ~~clientId, ~~modelId);
      return conversation
    } catch (err) {
      throw err;
    }
  }

  static async getChat(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const  { chatId } = req.body;
      if (chatId) return ChatServices.getConversationByChatId(res, chatId);
    } catch (err) {
      throw err;
    }
  }

  static async postMessage(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const data = req.body;
      const { pid } = req.query;
      delete data.chatId;
      const newMessage = await ChatServices.postMessage(
        res,
        pid as string,
        data
      );
      // global.io.sockets.in(req.body.chatId).emit('new message', { message: post });

      return newMessage;
    } catch (err) {
      throw err;
    }
  }

  static async markAsRead(req: NextApiRequest, res: NextApiResponse<any>) {
    try {

    } catch (err) {
      throw err;
    }
  }
}
