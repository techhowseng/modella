import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { validationResult, matchedData } from "express-validator";
import ChatRepository from "./repository";
import { bodyPermittedParams } from "helper/util";
// import { validateUser, validatePatchUser } from "./userValidation";

export default async function handle(
  req: NextApiRequest,
  res
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return await ChatRepository.getNewMessagesNotifications(req, res);
    case "POST":
      return await ChatRepository.initiateOrGetConversation(req, res);
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
