import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import UserRepository from "./repository";
import { validateUser, validateUpdateUser } from "./userValidation";
import { bodyPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await UserRepository.getUser(req, res);
      break;
    case "POST":
      break;
    case "PUT":
      await validateUpdateUser(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      bodyPermittedParams(req);
      await UserRepository.updateUser(req, res);
      break;
    case "PATCH":
      await UserRepository.verifyUser(req, res);
      break;
    case "DELETE":
      await UserRepository.deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
