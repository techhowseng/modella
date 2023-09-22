import { NextApiRequest, NextApiResponse } from "next";
import AdminRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await AdminRepository.getUserContracts(req, res);
      break;
    case "POST":
      break;
    case "PUT":
      await AdminRepository.vetClient(req, res);
      break;
    case "PATCH":
      break;
    case "DELETE":
      await AdminRepository.delete(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
