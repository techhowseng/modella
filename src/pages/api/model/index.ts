import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
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
      const { title, content, firstname, lastname } = req.body;

      const session = await getSession({ req });
      console.log(">>>>>>>>>>>>>>>>>>>", session);
      const result = await prisma.model.create({
        data: {
          email: title,
          bio: content,
          firstname: firstname,
          lastname: lastname,
          userId: "clbzc0zps54343j40r08t2l6bc",
          social: "facebook.com",
          address: "112, micheal street.",
        },
      });
      console.log("result>>>>>>>>>>>", result);
      res.json(result);
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
