import { Type, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import SessionService from "../../session/service";
import { ResponseService } from "helper/ResponseService";
import { getUser, getClient } from "helper/util";
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
      const user = await getUser(req);
      if (user) {
        const client = await ClientServices.createClient(
          res,
          user.id,
          companyName,
          email,
          phone,
          social,
          state,
          country,
          address
        );
      return client;
    }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateClient(req, res) {
    try {
      let { pid } = req.query;
      const user = await getUser(req);
      if (user) {
        const userId = user.type == "Admin" ? pid : user.id
        const updatedClient = await ClientServices.updateClient(res, userId, req.body);
        return updatedClient;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getClient(req, res) {
    try {
      const { pid } = req.query;
      const user = await ClientServices.getClient(res, ~~pid);
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
