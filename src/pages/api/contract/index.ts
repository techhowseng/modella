import { validationResult } from 'express-validator';
import { bodyPermittedParams } from 'helper/util';
import { NextApiRequest, NextApiResponse } from "next";
import { validateCreateContract } from "./contractValidation";
import ContractRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await ContractRepository.getUserContracts(req, res);
      break;
    case "POST":
      await validateCreateContract(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      bodyPermittedParams(req);
      await ContractRepository.createContract(req, res);
      break;
    case "PUT":
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
