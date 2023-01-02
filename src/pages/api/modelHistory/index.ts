import { NextApiRequest, NextApiResponse } from "next";
import HistoryRepository from "./respository";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json(await HistoryRepository.getHistory(req.body.id));
      break;
    case "POST":
      res.json(await HistoryRepository.createHistory(req.body));
      break;
    case "PUT":
      res.json(await HistoryRepository.updateHistory(req.body));
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
