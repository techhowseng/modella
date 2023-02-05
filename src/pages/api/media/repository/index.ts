import DatauriParser from 'datauri/parser';
import { ContentType, PrismaClient } from "@prisma/client";
import path from 'path';
import prisma from "lib/prisma";
import { cloudinary } from "../../../../helper/cloudinary";
import { getUser } from "helper/util";
import SessionService from "../../session/service";
import MediaServices, { TMedia } from "../service";
import { ResponseService } from 'helper/ResponseService';

const parser = new DatauriParser();

export default class MediaRepository {
	prisma: PrismaClient;
	static prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}

	static async createMedia(req, res) {
		try {
			const data = req.body;
			const image = req.file;
			const user = await getUser(req);
      if (user) {
				const base64Image = await parser.format(path.extname(image.originalname).toString(), image.buffer);

				const result = await cloudinary.uploader.upload(base64Image.content, {
					folder: data.contentType
				})

				let content = {...data.imageDetails }
				content["url"] = result.secure_url;
				content["public_id"] = result.public_id;

				const media = await MediaServices.createMedia(
					res,
					user.id,
					content,
					data.contentType
				);
				return media;
			}
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}

	static async getMedia(req, res) {
		try {
			const { id } = req.body;
			const media = await MediaServices.getMedia(res, ~~id);
			return media;
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}

	static async getMediaByUser(req, res) {
		try {
			let { userId } = req.body;
			if ( !userId) {
				const user = await getUser(req);
				userId = user ? user.id : userId
			}
			const media = await MediaServices.getMediaByUser(res, userId);
			return media;
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}

	static async deleteMedia(req, res) {
		try {
			const { id, userId, public_id} = req.body;
			const user = await getUser(req);
			if (user && user.type != "Admin" && userId == user.id) {
				return new Response('This user is not authorised to update the image.', {
					status: 401,
					headers: {
						'WWW-Authenticate': 'Basic realm="Secure Area"',
					},
				})
			}
			await cloudinary.uploader.destroy(public_id);
			const deleteMedia = await MediaServices.deleteMedia(res, id, userId);
			return deleteMedia;
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}

	static async updateMedia(req, res) {
		try {
			const { id, userId, content, contentType } = req.body
			const image = req.file;
			const user = await getUser(req);
			if (user && user.type != "Admin" && userId == user.id) {
				return new Response('This user is not authorised to update the image.', {
					status: 401,
					headers: {
						'WWW-Authenticate': 'Basic realm="Secure Area"',
					},
				})
			}
			const details = {
				width: content.width,
				height: content.height,
				crop: content.crop
			}
			await cloudinary.uploader.destroy(content.public_id);
			const result = await cloudinary.uploader.upload(image, {
				folder: contentType,
				...details
			});
			content["url"] = result.secure_url;
			content["public_id"] = result.public_id;
			const updatedMedia = await MediaServices.updateMedia(res, id, content, contentType);
			return updatedMedia;
		} catch(err) {
      return ResponseService.sendError(err, res);
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
      return ResponseService.sendError(err, res);
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
      return ResponseService.sendError(err, res);
		}
	}

	static async updateProfileImages(req: any, res: any) {
		try {
			const { content, type, id } = req.body
			const uploadedImages = await MediaServices.updateProfileImages(res, id, content, type);
			return uploadedImages;
		} catch(err) {
      return ResponseService.sendError(err, res);
		}
	}
}
