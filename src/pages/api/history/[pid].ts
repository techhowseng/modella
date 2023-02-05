import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import HistoryRepository from "./respository";
import { validateModelHistory } from "./historyValidation";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      break;
    case "POST":
      break;
    case "PUT":
      await validateModelHistory(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      res.json(await HistoryRepository.updateHistory(req, res));
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
