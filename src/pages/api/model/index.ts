import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { title, content, firstname, lastname } = req.body;

  const session = await getSession({ req });
  console.log(">>>>>>>>>>>>>>>>>>>", session)
  const result = await prisma.model.create({
    data: {
      email: title,
      bio: content,
      firstname: firstname,
      lastname: lastname,
      userId: "clbzc0zps0000j40r08t2l6bc",
      social: "facebook.com",
      address: "112, micheal street."
    },
  });
  console.log("result>>>>>>>>>>>", result);
  res.json(result);
}
