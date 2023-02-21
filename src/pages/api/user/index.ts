import { NextApiRequest, NextApiResponse } from "next";
import { validationResult, matchedData } from "express-validator";
import UserRepository from "./repository";
import { bodyPermittedParams } from "helper/util";
import { validateUser, validatePatchUser } from "./userValidation";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await UserRepository.getUserByEmail(req, res));
      break;
    case "POST":
      await validateUser(req, res);
      const createErrors = validationResult(req);
      if (!createErrors.isEmpty()) {
        return res.status(422).json({ errors: createErrors.array() });
      }
      bodyPermittedParams(req);
      res.json(await UserRepository.createUser(req, res));
      break;
    case "PUT":
      break;
    case "PATCH":
      await validatePatchUser(req, res);
      const createPatchErrors = validationResult(req);
      if (!createPatchErrors.isEmpty()) {
        return res.status(422).json({ errors: createPatchErrors.array() });
      }
      bodyPermittedParams(req);
      res.json(await UserRepository.verifyUser(req, res));
      break;
    case "DELETE":
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
