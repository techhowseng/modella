import { validationResult } from "express-validator";
import { ResponseService } from "helper/ResponseService";
import { NextApiRequest, NextApiResponse } from "next";
import { validateCreateMedia, validateUploadImages } from "./mediaValidation";
import MediaRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.userId && req.body.type) return res.json(await MediaRepository.getMediaByType(req, res));
      if (req.body.id && !req.body.userId) return res.json(await MediaRepository.getMedia(req, res));
      if (req.body.userId && !req.body.id) return res.json(await MediaRepository.getMediaByUser(req, res));
      ResponseService.sendError({ message: "Bad request"}, res);
      break;
    case "POST":
      if (req.body.content.potrait) {
        await validateUploadImages(req, res)
        const createErrors = validationResult(req)
        if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
        res.json(await MediaRepository.uploadProfileImages(req, res));
      } else {
        await validateCreateMedia(req, res)
        const createErrors = validationResult(req)
        if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
        res.json(await MediaRepository.createMedia(req, res));
      }
      break;
    case "PUT":
      if (req.body.type == "profile") {
        res.json(await MediaRepository.updateProfileImages(req, res));
      } else {
        await validateCreateMedia(req, res)
        const updateErrors = validationResult(req)
        if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
        res.json(await MediaRepository.updateMedia(req, res));
      }
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await MediaRepository.deleteMedia(req, res));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
