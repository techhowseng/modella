import { NextApiRequest, NextApiResponse } from "next";
import SessionRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await SessionRepository.getUserSession(req, res);
      break;
    case "POST":
      await SessionRepository.loginUser(req, res);
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
    case "DELETE":
      await SessionRepository.deleteSession(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
