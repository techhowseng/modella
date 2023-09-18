import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import ChatRepository from "./repository";
// import { validateUser, validateUpdateUser } from "./userValidation";
import { bodyPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await ChatRepository.getChat(req, res);
      break;
    case "POST":
      await ChatRepository.postMessage(req, res);
      break;
    case "PUT":
      await ChatRepository.markAsRead(req, res);
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
