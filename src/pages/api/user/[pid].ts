import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import UserRepository from "./repository";
import { validateUser, validateUpdateUser } from "./userValidation";
import { ResponseService } from "helper/ResponseService";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await UserRepository.getUser(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      await validateUpdateUser(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      res.json(await UserRepository.updateUser(req, res));
      break;
    case "PATCH":
      res.json(await UserRepository.verifyUser(req, res));
      break;
    case "DELETE":
      res.json(await UserRepository.deleteUser(req, res));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
