import { NextApiRequest, NextApiResponse } from "next";
import MediaRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await MediaRepository.getMedia(req.body.id));
      if (req.body.userId) res.json(await MediaRepository.getMediaByUser(req.body.userId));
      if (req.body.userId && req.body.type) res.json(await MediaRepository.getMediaByType(req.body.userId, req.body.type));
      break;
    case "POST":
      res.json(await MediaRepository.createMedia(req.body));
      break;
    case "PUT":
      res.json(await MediaRepository.updateMedia(req.body));
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await MediaRepository.deleteMedia(req.body.id));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
