import { NextApiRequest, NextApiResponse } from "next";
import ContractRepository from "./repository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await ContractRepository.getContract(req.body.id));
      else if (req.body.modelId) res.json(await ContractRepository.getAllModelContracts(req.body.modelId));
      else if (req.body.clientId) res.json(await ContractRepository.getAllClientContracts(req.body.clientId));
      break;
    case "POST":
      res.json(await ContractRepository.createContract(req.body));
      break;
    case "PUT":
      res.json(await ContractRepository.updateContract(req.body.id));
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
