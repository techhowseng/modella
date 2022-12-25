import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;
  const { method } = req;
  switch (method) {
    case "GET":
      //       res.status(200).json(todos);
      break;
    case "POST":
      //       res.status(200).json(todos);
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
    case "DELETE":
      const user = await prisma.user.update({
        where: { id: postId },
        data: {
          isDeleted: true,
        },
      });
      res.json(user);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
