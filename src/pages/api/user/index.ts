import { NextApiRequest, NextApiResponse } from "next";
import UserRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await UserRepository.getUser(req.body.id));
      if (req.body.email) res.json(await UserRepository.getUserByEmail(req.body.email));
      break;
    case "POST":
      const userRes = await UserRepository.createUser(req.body);
      res.json(userRes);
      break;
    case "PUT":
      res.json(await UserRepository.updateUser(req.body));
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await UserRepository.deleteUser(req.body));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
