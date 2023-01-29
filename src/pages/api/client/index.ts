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
      if (req.body.id) res.json(await ClientRepository.getClient(req, res));
      res.json(await ClientRepository.getAllClients(res));
      break;
    case "POST":
      await validateClient(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      res.json(await ClientRepository.createClient(req, res));
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
