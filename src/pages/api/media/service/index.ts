import { ContentType, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { ResponseService } from "../../../../services/ResponseService";

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
    try {
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
      throw err;
    }
  }

  static async getMedia(res, id: number) {
    try {
      const media = await this.prisma.media.findUnique({
        where: { id },
      });
      return media;
    } catch(err) {
      throw err;
    }
  }

  static async getMediaByUser(res, userId: string, page: number = 1) {
    try {
      const media = await this.prisma.media.findMany({
        where: { userId },
        take: 10,
        skip: 10 * (page - 1),
      });
      return media;
    } catch(err) {
      throw err;
    }
  }
  
  static async updateMedia(res, id: number, content: TContent) {
    try {
      const updatedMedia = await this.prisma.media.update({
        where: { id },
        data: {
          content
        },
      });
      return updatedMedia;
    } catch(err) {
      throw err;
    }
  }

  static async deleteMedia(res, id: number) {
    try {
      const deletedMedia = await this.prisma.media.delete({
        where: { id }
      });
      return deletedMedia;
    } catch(err) {
      throw err;
    }
  }

  static async getMediaByType(res, userId: string, contentType: ContentType) {
    try {
      const media = await this.prisma.media.findMany({
        where: {
          userId,
          contentType
        }
      });
      return media;
    } catch(err) {
      throw err;
    }
  }
}