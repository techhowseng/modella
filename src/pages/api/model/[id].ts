import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      //       res.status(200).json(todos);
      break;
    case "POST":
      break;
    case "PUT":
      const postId = Number(req.query.id);
      const post = await prisma.model.update({
        where: { id: postId },
        data: req.body,
      });
      res.json(post);
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
