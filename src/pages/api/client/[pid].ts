import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import ClientRepository from "./repository/index";
import { validateClient } from "./clientValidation";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await ClientRepository.getClient(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      await validateClient(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      res.json(await ClientRepository.updateClient(req, res));
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
