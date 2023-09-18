import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';
import DatauriParser from 'datauri/parser';
import { cloudinary } from "../../../../helper/cloudinary";
import { ResponseService } from "../../../../services/ResponseService";
import { getUser, getModelOrClient } from "helper/util";
import prisma from "lib/prisma";
import ModelServices, { TModel } from "../service";

const parser = new DatauriParser();

// @ts-ignore
export type TUser = PrismaClient["session"]["create"]["data"];

export default class ModelRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async createModel(req: NextApiRequest, res: NextApiResponse<any>) {
    const data = req.body;
    try {
      const user = await getUser(req, res);
      if (user) {
        const model = await ModelServices.createModel(
          res,
          user.id,
          data
        );
        return ResponseService.json(res, 200, "Success", model);
      }
    } catch(err) {
      throw err;
    }
  }

  static async getModel(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      if (pid == "user") {
        const model = await getModelOrClient(req, res);
        return ResponseService.json(res, 200, "Success", model);
      } else if (pid.length == 25) {
        const model = await ModelServices.getModelByUserId(res, pid as string);
        return ResponseService.json(res, 200, "Success", model);
      }
      return await ModelServices.getModel(res, ~~pid);
    } catch(err) {
      throw err;
    }
  }

  static async getAllModels(res: NextApiResponse<any>) {
		const models = await ModelServices.getAllModels(res);
    return ResponseService.json(res, 200, "Success", models);
	}

  static async updateModel(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const data = req.body;
      let { pid } = req.query;
      const user = await getUser(req, res);
      if (user) {
        const userId = user.type == "Admin" ? pid : user.id;
        const model = await ModelServices.updateModel(
          res,
          userId as string,
          data
        );
        return ResponseService.json(res, 200, "Success", model);
      }
    } catch (err) {
      throw err;
    }
  }

  static async uploadThumbnail(req, res: NextApiResponse<any>) {
    try {
			const image = req.file;
      const user = await getUser(req, res);
      if (user) {
        const base64Image = await parser.format(path.extname(image.originalname).toString(), image.buffer);
        const result = await cloudinary.uploader.upload(base64Image.content, {
          folder: user.id
        })

        const model = await ModelServices.uploadThumbnail(
          res,
          user.id,
          result.secure_url,
          result.public_id
        );
        return ResponseService.json(res, 200, "Success", model);
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateThumbnail(req, res: NextApiResponse<any>) {
    try {
      const { thumbnailPublicId } = req.body;
      const image = req.file;
      const user = await getUser(req, res);
      const success = await cloudinary.uploader.destroy(thumbnailPublicId);
      if (success && user) {
        const base64Image = await parser.format(path.extname(image.originalname).toString(), image.buffer);
        const result = await cloudinary.uploader.upload(base64Image.content, {
          folder: user.id
        })

        const model = await ModelServices.uploadThumbnail(
          res,
          user.id,
          result.secure_url,
          result.public_id
        );
        return ResponseService.json(res, 200, "Success", model);
      } else {
        return new Response('Unable to delete this image from cloud', {
					status: 400
				})
      }
    } catch (err) {
      throw err;
    }
  }

  static async deleteThumbnail(req, res: NextApiResponse<any>) {
    try {
      const { thumbnailPublicId } = req.body;
      const user = await getUser(req, res);
      const success = await cloudinary.uploader.destroy(thumbnailPublicId);
      if (success && user) {
        const model = await ModelServices.uploadThumbnail(
          res,
          user.id
        );
        return ResponseService.json(res, 200, "Success", model);
      }
    } catch (err) {
      throw err;
    }
  }
}
