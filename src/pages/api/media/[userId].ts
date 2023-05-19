import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from "express-validator";
import MediaRepository from "./repository";
import { bodyPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await MediaRepository.getMediaByUser(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
