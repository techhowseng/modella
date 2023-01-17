import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";
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
        userId,
        companyName,
        email,
        phone,
        social,
        state,
        country,
        address
      } = req.body;
      const user = await ClientServices.createClient(
        res,
        userId,
        companyName,
        email,
        phone,
        social,
        state,
        country,
        address
      );;
      return user;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateClient(req, res) {
    try {
      const { body } = req;
      const user = await ClientServices.updateClient(res, body);
      return user;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getClient(req, res) {
    try {
      const { id } = req.body;
      const user = await ClientServices.getClient(res, id);
      return user;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllClients(res) {
    try {
      const user = await ClientServices.getAllClients(res);
      return user;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }
}
