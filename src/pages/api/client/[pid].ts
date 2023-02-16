import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from "express-validator";
import ClientRepository from "./repository/index";
import { validateCreateClient } from "./clientValidation";
import { bodyPermittedParams } from "helper/util";

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
      await validateCreateClient(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      bodyPermittedParams(req);
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
