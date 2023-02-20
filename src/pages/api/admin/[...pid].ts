import { NextApiRequest, NextApiResponse } from "next";
import AdminRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      break;
    case "POST":
      break;
    case "PUT":
      res.json(await AdminRepository.vetClient(req, res));
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await AdminRepository.delete(req, res));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
