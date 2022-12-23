import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const postId = req.query.id;
  const post = await prisma.model.update({
    where: { id: postId },
    data: req.data,
  });
  res.json(post);
}