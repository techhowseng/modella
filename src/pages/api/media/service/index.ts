import { ContentType, PrismaClient } from "@prisma/client";
import cloudinary from "../../../../helper/cloudinary";
import prisma from "lib/prisma";
import { ResponseService } from "helper/ResponseService";

// @ts-ignore
export type TMedia = PrismaClient["media"]["create"]["data"];

export default class MediaServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

  static async createMedia(
    res,
    userId: string,
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
            connect: { id: userId },
          },
        },
      });
      return media;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getMedia(res, id: number) {
    try {
      const media = await this.prisma.media.findUnique({
        where: { id },
      });
      return media;
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }

  static async getMediaByUser(res, userId: string) {
    try {
      const media = await this.prisma.media.findMany({
        where: { userId },
      });
      return media;
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }
  

  static async updateMedia(res, data: TMedia) {
    try {
      const updatedMedia = await this.prisma.media.update({
        where: { id: data.id },
        data
      });
      return updatedMedia;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async deleteMedia(res, id: number) {
    try {
      const deletedMedia = await this.prisma.media.delete({
        where: { id }
      });
      return deletedMedia;
    } catch (err) {
      return ResponseService.json(res, err);
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
    } catch (err) {
      return ResponseService.json(res, err);
    }
  }
}