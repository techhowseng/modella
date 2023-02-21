import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import { validateUpdateJob, validateSearchJob } from "./jobValidation";
import JobsRepository from "./repository";
import { bodyPermittedParams, queryPermittedParams } from "helper/util";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await validateSearchJob(req, res)
      const searchErrors = validationResult(req)
      if (!searchErrors.isEmpty()) return res.status(422).json({ errors: searchErrors.array() });
      queryPermittedParams(req);
      res.json(await JobsRepository.getJob(req, res));
      break;
    case "POST":
      break;
    case "PUT":
      await validateUpdateJob(req, res)
      const updateErrors = validationResult(req)
      if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
      bodyPermittedParams(req);
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
