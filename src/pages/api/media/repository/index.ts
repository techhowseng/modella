import { ContentType, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import MediaServices, { TMedia } from "../service";

export default class MediaRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createMedia(req, res) {
		const data = req.body;
		const media = await MediaServices.createMedia(
			res,
      data.userId,
      data.content,
      data.contentType
    );
		return media;
	}

	static async getMedia(req, res) {
		const { id } = req.body.data;
		const media = await MediaServices.getMedia(res, id);
		return media;
	}

	static async getMediaByUser(req, res) {
		const { userId } = req.body.data;
		const media = await MediaServices.getMediaByUser(res, userId);
		return media;
	}

	static async deleteMedia(req, res) {
		const { id } = req.body.data;
		const deleteMedia = await MediaServices.deleteMedia(res, id);
		return deleteMedia;
	}

	static async updateMedia(req, res) {
		const { data } = req.body
			const updatedMedia = await MediaServices.updateMedia(res, data);
			return updatedMedia;
	}

  static async getMediaByType(req, res) {
		const { userId, type } = req.body
    const updatedMedia = await MediaServices.getMediaByType(res, userId, type);
    return updatedMedia;
  }
}
