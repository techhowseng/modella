import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from "express-validator";
import { validateCreateJob, validateUpdateJob } from "./jobValidation";
import JobsRepository from "./repository";
import { bodyPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await JobsRepository.searchJobs(req, res);
      return;
    case "POST":
      await validateCreateJob(req, res);
      const createErrors = validationResult(req);
      if (!createErrors.isEmpty()) {
        res.status(422).json({ errors: createErrors.array() });
        return;
      }
      bodyPermittedParams(req);
      res.json(await JobsRepository.createJob(req, res));
      return;
    case "PUT":
      return;
    case "PATCH":
      return;
    case "DELETE":
      return;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
}
