import { NextApiRequest, NextApiResponse } from "next";
import { validateUpdateModel } from "./modelValidation";
import ModelRepository from "./repository/index";
import { validationResult } from "express-validator";
import { bodyPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await ModelRepository.getModel(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      await validateUpdateModel(req, res);
      const updateErrors = validationResult(req);
      if (!updateErrors.isEmpty())
        return res.status(422).json({ errors: updateErrors.array() });
      bodyPermittedParams(req);
      res.json(await ModelRepository.updateModel(req, res));
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
