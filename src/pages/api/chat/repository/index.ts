import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { Server } from "socket.io";
import ChatServices from "../service";
import { ResponseService } from "../../../../services/ResponseService";
import { NextApiRequest, NextApiResponse } from "next";
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;

export default class ChatRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async initiateSocket(req: NextApiRequest, res) {
    try {
      if (res.socket.server.io) {
        console.log('Socket is already running')
      } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
      }
      res.end()
    
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
    
      let clientSocketIds = [];
      let createdUsers = [];
    
      const getSocketByUserId = (userId) => {
        let socket = {id: null};
        for(let i = 0; i < clientSocketIds.length; i++) {
          if(clientSocketIds[i].userId == userId) {
            socket = clientSocketIds[i].socket;
            break;
          }
        }
        return socket;
      }
    
      io.on('connection', socket => {
        console.log('connected')
        socket.on('createSocket', function(user) {
          clientSocketIds = clientSocketIds.filter(item => item.userId != user.userId)
          clientSocketIds.push({ socket: socket, userId:  user.userId });
          createdUsers = createdUsers.filter(item => item.userId != user.userId);
          createdUsers.push({...user, socketId: socket.id})
          io.emit('createdUsers', createdUsers)
        });

        socket.on('disconnect', () => {
          console.log("disconnected")
          clientSocketIds = clientSocketIds.filter(item => item.socket.id != socket.id)
          createdUsers = createdUsers.filter(item => item.socketId != socket.id);
          io.emit('createdUsers', createdUsers)
        });
    
        // socket.on('loggedin', function(user) {
        //   clientSocketIds.push({ socket: socket, userId:  user.user_id });
        //   createdUsers = createdUsers.filter(item => item.user_id != user.user_id);
        //   createdUsers.push({...user, socketId: socket.id})
        //   io.emit('createdUsers', createdUsers)
        // });
    
        socket.on('create', function(data) {
          console.log("create room")
          socket.join(data.chatId);
          let withSocket = getSocketByUserId(data.withUserId);
          socket.broadcast.to(withSocket.id).emit("invite", { data })
        });
    
        socket.on('joinRoom', function(data) {
          console.log("join", data)
          socket.join(data.chatId);
        });
    
        socket.on('message', function(data) {
          console.log("sending message", data)
          socket.broadcast.to(data.chatId)
          socket.emit('message', data);
        });
      })
      
      console.log("Setting up socket");
      res.end();

    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async initiateOrGetConversation(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const  { chatId, modelId, clientId } = req.body;
      if (chatId) return await ChatServices.getConversationByChatId(res, chatId);
      const conversation = await ChatServices.getOrCreateConversation(res, ~~clientId, ~~modelId);
      return conversation
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getChat(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const  { chatId } = req.body;
      if (chatId) return ChatServices.getConversationByChatId(res, chatId);
    } catch (err) {
      return ResponseService.sendError(err, res);
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
      return ResponseService.sendError(err, res);
    }
  }

  static async markAsRead(req: NextApiRequest, res: NextApiResponse<any>) {
    try {

    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
