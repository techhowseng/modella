import { ContentType, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

// @ts-ignore
export type TMedia = PrismaClient["media"]["create"]["data"];

export default class MediaServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

  static async createMedia(
    userId: string,
    content: object,
    contentType: ContentType
  ) {
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
  }

  static async getMedia(id: number) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });
    return media;
  }

  static async getMediaByUser(userId: string) {
    const media = await this.prisma.media.findMany({
      where: { userId },
    });
    return media;
  }
  

  static async updateMedia(data: TMedia) {
    const updatedMedia = await this.prisma.media.update({
      where: { id: data.id },
      data
    });
    return updatedMedia;
  }

  static async deleteMedia(id: number) {
    const deletedMedia = await this.prisma.media.delete({
      where: { id }
    });
    return deletedMedia;
  }

  static async getMediaByType(userId: string, type: ContentType) {
    const media = await this.prisma.media.findMany({
      where: {
        userId,
        contentType: type
      }
    });
    return media;
  }
}