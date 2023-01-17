import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import UserRepository from "./repository";
import { validateUser } from "./userValidation";
import { ResponseService } from "helper/ResponseService";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id && !req.body.email) res.json(await UserRepository.getUser(req, res));
      if (req.body.email && !req.body.id) res.json(await UserRepository.getUserByEmail(req, res));
      ResponseService.json(res, "custom_400");
      break;
    case "POST":
      await validateUser(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      res.json(await UserRepository.createUser(req, res));
      break;
    case "PUT":
      await validateUser(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      res.json(await UserRepository.updateUser(req, res));
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await UserRepository.deleteUser(req, res));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
