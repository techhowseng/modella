import { validationResult } from "express-validator";
import { queryPermittedParams } from "helper/util";
import { validateModelSearch } from "./modelsValidation";
import { NextApiRequest, NextApiResponse } from "next";
import ModelRepository from "./repository/index";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await validateModelSearch(req, res)
      const searchErrors = validationResult(req)
      if (!searchErrors.isEmpty()) return res.status(422).json({ errors: searchErrors.array() });
      queryPermittedParams(req);
      res.json(await ModelRepository.getModels(req, res));
      break;
    case "POST":
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
