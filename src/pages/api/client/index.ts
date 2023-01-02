import { NextApiRequest, NextApiResponse } from "next";
import ClientRepository from "./repository/index";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await ClientRepository.getClient(req.body.id));
      break;
    case "POST":
      res.json(await ClientRepository.createClient(req.body));
      break;
    case "PUT":
      res.json(await ClientRepository.updateClient(req.body));
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
