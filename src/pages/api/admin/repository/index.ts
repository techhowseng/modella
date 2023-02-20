import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import { isUserAdmin } from "helper/util";
import prisma from "lib/prisma";
import AdminServices, { TModel } from "../service";
import { NextApiRequest, NextApiResponse } from "next";

// @ts-ignore
export type TUser = PrismaClient["session"]["create"]["data"];

export default class ModelRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

  static async vetClient(req: NextApiRequest, res: NextApiResponse<any>) {
    const { pid } = req.query;
    try {
      if (isUserAdmin) {
        if (pid[0] == "client") {
          const models = await AdminServices.vetClientById(res, ~~pid[1]);
          return models;
        } else {
          const models = await AdminServices.vetClientByuser(res, pid[1]);
          return models;
        }
      } else {
        return ResponseService.sendError({ 
          message: "This user is not authorized to take this action.",
          status: 401
        }, res);
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}

  static async delete(req: NextApiRequest, res: NextApiResponse<any>) {
    const { pid } = req.query;
    try {
      if (isUserAdmin) {
        if (pid[0] == "user") {
          const user = await AdminServices.disableUser(res, pid[1]);
          return user;
        } else if (pid[0] == "usermedia") {
          const userMedia = await AdminServices.deleteUserMedia(res, pid[1]);
          return userMedia;
        } else {
          const deleted = await AdminServices.dynamicDelete(res, pid[0], pid[1]);
          return deleted;
        }
      } else {
        return ResponseService.sendError({ 
          message: "This user is not authorized to take this action.",
          status: 401
        }, res);
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
	}
}
