import { ResponseService } from "helper/ResponseService";
import { validationResult } from 'express-validator';
import { NextApiRequest, NextApiResponse } from "next";
import { validateContract } from "./contractValidation";
import ContractRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await ContractRepository.getUserContracts(req, res));
      break;
    case "POST":
      await validateContract(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      res.json(await ContractRepository.createContract(req, res));
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
