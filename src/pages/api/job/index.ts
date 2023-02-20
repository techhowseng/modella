import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import { validateCreateJob, validateUpdateJob } from "./jobValidation";
import JobsRepository from "./repository";
import { permittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await JobsRepository.getJobs(res));
      break;
    case "POST":
      await validateCreateJob(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      permittedParams(req);
      res.json(await JobsRepository.createJob(req, res));
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
