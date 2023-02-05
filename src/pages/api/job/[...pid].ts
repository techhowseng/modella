import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import { validateCreateJob, validateUpdateJob } from "./jobValidation";
import JobsRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await JobsRepository.getJob(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      await validateUpdateJob(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      res.json(await JobsRepository.updateJob(req, res));
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await JobsRepository.deleteJob(req, res));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
