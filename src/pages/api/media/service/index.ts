import { ContentType, PrismaClient } from "@prisma/client";
import cloudinary from "../../../../helper/cloudinary";
import prisma from "lib/prisma";
import { ResponseService } from "helper/ResponseService";

// @ts-ignore
export type TMedia = PrismaClient["media"]["create"]["data"];
// @ts-ignore
export type TContent = PrismaClient["content"]["create"]["data"];

export default class MediaServices {
  static prisma: PrismaClient = prisma;

  static async createMedia(
    res,
    id: string,
    content: object,
    contentType: ContentType
  ) {
    //@ts-ignore
    const { image } = content;
    try {
      //@ts-ignore
      const result = await cloudinary.uploader.upload(image, {
        folder: contentType
      })
      content["url"] = result.secure_url;
      content["public_id"] = result.public_id;
      const media = await this.prisma.media.create({
        data: {
          content,
          contentType,
          user: {
            connect: { id },
          },
        },
      });
      return media;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async uploadProfileImages(res, id: string, content: object, contentType: ContentType) {
    try {

      let imagesObject = {}
      for (const key in content) {
        //@ts-ignore
        const result = await cloudinary.uploader.upload(content[key].uri, {
          folder: contentType
        })
        imagesObject[key] = {};
        imagesObject[key].url = result.secure_url;
        imagesObject[key].public_id = result.public_id;
        imagesObject[key].width = content[key].width;
        imagesObject[key].height = content[key].height;
        imagesObject[key].crop = content[key].crop;
      }
      const media = await this.prisma.media.create({
        data: {
          content: imagesObject,
          contentType,
          user: {
            connect: { id },
          },
        },
      });
      return media;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateProfileImages(res, id: number, content: object, contentType: ContentType) {
    try {

      let imagesObject = {}
      for (const key in content) {
        //@ts-ignore
        await cloudinary.uploader.destroy(content[key][public_id]);

        //@ts-ignore
        const result = await cloudinary.uploader.upload(content[key][uri], {
          folder: contentType
        })
        imagesObject[key] = {};
        imagesObject[key].url = result.secure_url;
        imagesObject[key].public_id = result.public_id;
        imagesObject[key].width = content[key].width;
        imagesObject[key].height = content[key].height;
        imagesObject[key].crop = content[key].crop;
      }

      let selectedMedia = await prisma.media.findFirst({
        where: { id }
      });
      
      selectedMedia = {...selectedMedia, ...imagesObject}
      const updatedMedia = await this.prisma.media.update({
        where: { id },
        data: {
          content: selectedMedia,
          contentType,
        },
      });
      return updatedMedia;    //@ts-ignore

    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }


  static async getMedia(res, id: number) {
    try {
      const media = await this.prisma.media.findUnique({
        where: { id },
      });
      return media;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getMediaByUser(res, userId: string) {
    try {
      const media = await this.prisma.media.findMany({
        where: { userId },
      });
      return media;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
  

  static async updateMedia(res, id: number, content: TContent, contentType: ContentType) {
    try {
      //@ts-ignore
      await cloudinary.uploader.destroy(content[public_id]);
      const details = {
        width: content.width,
        height: content.height,
        crop: content.crop
      }

      //@ts-ignore
      const result = await cloudinary.uploader.upload(image, {
        folder: contentType,
        ...details
      })
      content["url"] = result.secure_url;
      content["public_id"] = result.public_id;

      const updatedMedia = await this.prisma.media.update({
        where: { id },
        data: {
          content,
          contentType,
        },
      });
      return updatedMedia;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteMedia(res, id: number, cloudinaryId: number) {
    try {
      //@ts-ignore
      const imgId = await cloudinary.uploader.destroy(cloudinaryId)
      const deletedMedia = await this.prisma.media.delete({
        where: { id }
      });
      return deletedMedia;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getMediaByType(res, userId: string, type: ContentType) {
    try {
      const media = await this.prisma.media.findMany({
        where: {
          userId,
          contentType: type
        }
      });
      return media;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}