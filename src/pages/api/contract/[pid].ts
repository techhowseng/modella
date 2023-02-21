import { validationResult } from 'express-validator';
import { bodyPermittedParams } from 'helper/util';
import { NextApiRequest, NextApiResponse } from "next";
import { validateUpdateContract } from "./contractValidation";
import ContractRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await ContractRepository.getContract(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      await validateUpdateContract(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      bodyPermittedParams(req);
      res.json(await ContractRepository.updateContract(req, res));
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
