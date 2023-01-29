import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
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
      let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionService.getSession(res, token)
      if (session) {
        const user = await ModelServices.createModel(
          res,
          session.userId,
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
      const { id } = req.body;
      const user = await ModelServices.getModel(res, ~~id);
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

      let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionService.getSession(res, token)
      if (session) {
        const user = await ModelServices.updateModel(res, session.userId, data);
        return user;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}
