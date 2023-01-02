import { ContentType, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import MediaServices, { TMedia } from "../service";

export default class MediaRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createMedia(data: TMedia) {
		const media = await MediaServices.createMedia(
      data.userId,
      data.content,
      data.contentType
    );
		return media;
	}

	static async getMedia(id: number) {
		const media = await MediaServices.getMedia(id);
		return media;
	}

	static async getMediaByUser(userId: string) {
		const media = await MediaServices.getMediaByUser(userId);
		return media;
	}

	static async deleteMedia(id: number) {
		const deleteMedia = await MediaServices.deleteMedia(id);
		return deleteMedia;
	}

	static async updateMedia(data: TMedia) {
			const updatedMedia = await MediaServices.updateMedia(data);
			return updatedMedia;
	}

  static async getMediaByType(userId: string, type: ContentType) {
    const updatedMedia = await MediaServices.getMediaByType(userId, type);
    return updatedMedia;
  }
}
