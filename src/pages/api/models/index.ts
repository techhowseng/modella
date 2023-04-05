import { validationResult } from "express-validator";
import { queryPermittedParams } from "helper/util";
import { NextApiRequest, NextApiResponse } from "next";
import { validateModelsGet } from "./modelsValidation";
import ModelRepository from "./repository/index";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await validateModelsGet(req, res)
      const searchErrors = validationResult(req)
      if (!searchErrors.isEmpty()) return res.status(422).json({ errors: searchErrors.array() });
      queryPermittedParams(req);
      res.json(await ModelRepository.getAllModels(req, res));
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
