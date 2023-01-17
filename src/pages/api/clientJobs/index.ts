import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import { validateJob } from "./jobsValidation";
import JobsRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await JobsRepository.getJob(req, res));
      else if (req.body.clientId) res.json(await JobsRepository.getAllClientJobs(req, res));
      else if (req.query) res.json(await JobsRepository.searchJobs(req, res));
      else res.json(await JobsRepository.getJobs(res));
      break;
    case "POST":
      await validateJob(req, res)
      const createErrors = validationResult(req)
      if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
      res.json(await JobsRepository.createJob(req, res));
      break;
    case "PUT":
      await validateJob(req, res)
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
