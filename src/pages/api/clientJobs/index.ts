import { NextApiRequest, NextApiResponse } from "next";
import jobsRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await jobsRepository.getJob(req.body.id));
      else if (req.body.clientId) res.json(await jobsRepository.getAllClientJobs(req.body.clientId));
      else if (req.query) res.json(await jobsRepository.searchJobs(req.query.q));
      else res.json(await jobsRepository.getJobs());
      break;
    case "POST":
      res.json(await jobsRepository.createJob(req.body));
      break;
    case "PUT":
      res.json(await jobsRepository.updateJob(req.body.id));
      break;
    case "PATCH":
      break;
    case "DELETE":
      res.json(await jobsRepository.deleteJob(req.body.id));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
