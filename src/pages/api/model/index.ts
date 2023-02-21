import { NextApiRequest, NextApiResponse } from "next";
import ModelRepository from "./repository/index";
import { validateCreateModel } from "./modelValidation";
import { validationResult } from "express-validator";
import { bodyPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      break;
    case "POST":
      await validateCreateModel(req, res);
      const createErrors = validationResult(req);
      if (!createErrors.isEmpty())
        return res.status(422).json({ errors: createErrors.array() });
      bodyPermittedParams(req);
      res.json(await ModelRepository.createModel(req, res));
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
