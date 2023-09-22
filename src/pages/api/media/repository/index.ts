import DatauriParser from "datauri/parser";
import { ContentType, PrismaClient } from "@prisma/client";
import path from "path";
import prisma from "lib/prisma";
import { cloudinary } from "../../../../helper/cloudinary";
import { getUser, getModelOrClient } from "helper/util";
import ModelServices from "../../model/service";
import MediaServices, { TMedia } from "../service";
import { ResponseService } from "../../../../services/ResponseService";

const parser = new DatauriParser();

export default class MediaRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async uploadMedia(req, res) {
    try {
      const data = req.body;
      const images = req.files;
      const user = await getModelOrClient(req, res);
      let noOfImages = 0;
      let content = {};
      let returnedData = [];

      //@ts-ignore
      if (images.length + user.mediaCount > 10) {
        return new Response("This user is only allowed to upload 10 images.", {
          status: 400,
          headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
          },
        });
      }

      if (user) {
        for (const image of images) {
          const base64Image = await parser.format(
            path.extname(image.originalname).toString(),
            image.buffer
          );

          const result = await cloudinary.uploader.upload(base64Image.content, {
            folder: user.id,
          });

          content["url"] = result.secure_url;
          content["public_id"] = result.public_id;

          const media = await MediaServices.createMedia(
            res,
            user.userId,
            content,
            data.contentType
          );
          returnedData.push(media);
        }
        noOfImages = returnedData.length;
        await ModelServices.updateMediaCount(res, user.id, `+${noOfImages}`);
        return ResponseService.json(
          res,
          201,
          "Successfully uploaded images.",
          returnedData
        );
      }
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getMedia(req, res) {
    try {
      const { id } = req.body;
      const media = await MediaServices.getMedia(res, ~~id);
      return ResponseService.json(res, 200, "Success", media);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getMediaByUser(req: any, res: any) {
    try {
      const { userId, page } = req.query;
      const media = await MediaServices.getMediaByUser(res, userId, page);
      return ResponseService.json(res, 200, "Success", media);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteMedia(req, res) {
    try {
      const { id, userId, public_id } = req.body;
      const user = await getModelOrClient(req, res);
      if (user) {
        await cloudinary.uploader.destroy(public_id);
        const deletedMedia = await MediaServices.deleteMedia(res, ~~id);
        await ModelServices.updateMediaCount(res, user.id, "-1");
        return ResponseService.json(res, 200, "Success", deletedMedia);
      }
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateMedia(req, res) {
    try {
      const { updateData } = req.body;
      const images = req.files;
      const user = await getModelOrClient(req, res);
      let returnedData = [];
      let noOfImages = 0;
      let content = {};
      if (user) {
        for (const image of images) {
          let oldImageObject = updateData[noOfImages];
          const base64Image = await parser.format(
            path.extname(image.originalname).toString(),
            image.buffer
          );
          const result = await cloudinary.uploader.upload(base64Image.content, {
            folder: user.id,
          });
          await cloudinary.uploader.destroy(oldImageObject["public_id"]);
          content["url"] = result.secure_url;
          content["public_id"] = result.public_id;

          const media = await MediaServices.updateMedia(
            res,
            oldImageObject.id,
            content
          );
          returnedData.push(media);
        }
        return ResponseService.json(
          res,
          201,
          "Successfully updated images.",
          returnedData
        );
      }
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getMediaByType(req, res) {
    try {
      let { userId, type } = req.body;
      if (!userId) {
        const user = await getUser(req, res);
        if (user) {
          userId = user.id;
        }
      }
      const updatedMedia = await MediaServices.getMediaByType(
        res,
        userId,
        type
      );
      return ResponseService.json(res, 200, "Success", updatedMedia);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
