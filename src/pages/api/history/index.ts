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
      res.json(await HistoryRepository.getHistory(req, res));
      break;
    case "POST":
      await validateModelHistory(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      res.json(await HistoryRepository.createHistory(req, res));
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
