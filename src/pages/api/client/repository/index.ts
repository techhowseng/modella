import { Type, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { ResponseService } from "../../../../services/ResponseService";
import { getUser } from "helper/util";
import ClientServices, { TClient } from "../service";

export default class ClientRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createClient(req, res) {
    try {
      const data = req.body;
      const user = await getUser(req);
      if (user) {
        const client = await ClientServices.createClient(
          res,
          user.id,
          data
        );
      return ResponseService.json(res, 200, "Success", client);
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
        return ResponseService.json(res, 200, "Success", updatedClient);
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getClient(req, res) {
    try {
      const { pid } = req.query;
      const client = await ClientServices.getClient(res, ~~pid);
      return ResponseService.json(res, 200, "Success", client);
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClients(res) {
    try {
      const clients = await ClientServices.getAllClients(res);
      return ResponseService.json(res, 200, "Success", clients);
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
