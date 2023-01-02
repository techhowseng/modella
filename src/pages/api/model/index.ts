import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import ModelRepository from "./repository/index";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      if (req.body.id) res.json(await ModelRepository.getModel(req.body.id));
      if (!req.body.id) res.json(await ModelRepository.getAllModels());
      break;
    case "POST":
      res.json(await ModelRepository.createModel(req.body));
      break;
    case "PUT":
      res.json(await ModelRepository.updateModel(req.body));
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
