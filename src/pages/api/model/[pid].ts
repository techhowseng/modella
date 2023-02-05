import { NextApiRequest, NextApiResponse } from "next";
import ModelRepository from "./repository/index";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await ModelRepository.getModel(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      res.json(await ModelRepository.updateModel(req, res));
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
