import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import { getUser } from "helper/util";
import SessionService from "../../session/service";
import prisma from "lib/prisma";
import ModelServices, { TModel } from "../service";

// @ts-ignore
export type TUser = PrismaClient["session"]["create"]["data"];

export default class ModelRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createModel(req, res) {
		const {
      email,
      firstname,
      lastname,
      height,
      bust,
      waist,
      hip,
      shoeSize,
      weight,
      complexion,
      DOB,
      social,
      state,
      country,
      phone,
      address,
      isAvailable,
      types,
      bio
		} = req.body;
    try {
      const session = await getUser(req);
      if (session) {
        const user = await ModelServices.createModel(
          res,
          session.id,
          email,
          firstname,
          lastname,
          height,
          bust,
          waist,
          hip,
          shoeSize,
          weight,
          complexion,
          DOB,
          social,
          state,
          country,
          phone,
          address,
          isAvailable,
          types,
          bio
        );
        return user;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

	static async getModel(req, res) {
    try {
      const { pid } = req.query;
      const user = await ModelServices.getModel(res, ~~pid);
      return user;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

  static async getAllModels(res) {
		const user = await ModelServices.getAllModels(res);
		return user;
	}

	static async updateModel(req, res) {
    try {
      const data = req.body
      let { pid } = req.query;
      const user = await getUser(req);
      if (user) {
        const userId = user.type == "Admin" ? pid : user.id
        const model = await ModelServices.updateModel(res, userId, data);
        return model;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}
