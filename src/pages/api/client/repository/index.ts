import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import SessionService from "../../session/service";
import { ResponseService } from "helper/ResponseService";
import ClientServices, { TClient } from "../service";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createClient(req, res) {
    try {
      const {
        companyName,
        email,
        phone,
        social,
        state,
        country,
        address
      } = req.body;
      let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionService.getSession(res, token)
      if (session) {
      const user = await ClientServices.createClient(
        res,
        session.id,
        companyName,
        email,
        phone,
        social,
        state,
        country,
        address
      );;
      return user;
    }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateClient(req, res) {

    try {
      const { body } = req;
      let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionService.getSession(res, token)
      if (session) {
      const user = await ClientServices.updateClient(res, session.id, body);
      return user;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getClient(req, res) {
    try {
      const { id } = req.body;
      const user = await ClientServices.getClient(res, ~~id);
      return user;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClients(res) {
    try {
      const user = await ClientServices.getAllClients(res);
      return user;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
