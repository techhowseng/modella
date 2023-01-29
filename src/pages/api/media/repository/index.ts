import { ContentType, PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import SessionService from "../../session/service";
import MediaServices, { TMedia } from "../service";

export default class MediaRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createMedia(req, res) {
		try {
			const data = req.body;

			let token: string;
			const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionService.getSession(res, token)
      if (session) {
				const media = await MediaServices.createMedia(
					res,
					session.id,
					data.content,
					data.contentType
				);
				return media;
			}
		} catch(err) {

		}
	}

	static async getMedia(req, res) {
		try {
			const { id } = req.body;
			const media = await MediaServices.getMedia(res, id);
			return media;
		} catch(err) {

		}
	}

	static async getMediaByUser(req, res) {
		try {
			let { userId } = req.body;
			if ( !userId) {
				let token: string;
				const { authorization } = req.headers;
				if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
				const session = await SessionService.getSession(res, token)
				if (session) {
					userId = session.id
				}
			}
			const media = await MediaServices.getMediaByUser(res, userId);
			return media;
		} catch(err) {

		}
	}

	static async deleteMedia(req, res) {
		try {
			const { id , public_id} = req.body;
			const deleteMedia = await MediaServices.deleteMedia(res, id, public_id);
			return deleteMedia;
		} catch(err) {

		}
	}

	static async updateMedia(req, res) {
		try {
			const { id, content, contentType } = req.body
			const updatedMedia = await MediaServices.updateMedia(res, id, content, contentType);
			return updatedMedia;
		} catch(err) {

		}
	}

  static async getMediaByType(req, res) {
		try {
			let { userId, type } = req.body
			if (!userId) {
				let token: string;
				const { authorization } = req.headers;
				if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
				const session = await SessionService.getSession(res, token)
				if (session) {
					userId = session.id
				}
			}
			const updatedMedia = await MediaServices.getMediaByType(res, userId, type);
			return updatedMedia;
		} catch(err) {

		}
  }

	static async uploadProfileImages(req: any, res: any) {
		try {
			let { content, type, userId } = req.body
			if (!userId) {
				let token: string;
				const { authorization } = req.headers;
				if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
				const session = await SessionService.getSession(res, token)
				if (session) {
					userId = session.id
				}
			}
			const uploadedImages = await MediaServices.uploadProfileImages(res, userId, content, type);
			return uploadedImages;
		} catch(err) {

		}
	}

	static async updateProfileImages(req: any, res: any) {
		try {
			const { content, type, id } = req.body
			const uploadedImages = await MediaServices.updateProfileImages(res, id, content, type);
			return uploadedImages;
		} catch(err) {

		}
	}
}
