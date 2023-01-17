import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ModelRepository from "./repository/index";
import { validateModel } from "./modelValidation";
import { validationResult } from "express-validator";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await ModelRepository.getModel(req, res));
      if (!req.body.id) res.json(await ModelRepository.getAllModels(res));
      break;
    case "POST":
      await validateModel(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      res.json(await ModelRepository.createModel(req, res));
      break;
    case "PUT":
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
