import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const user = await prisma.user.update({
      where: { id: postId },
      data: {
        isDeleted: true,
      },
    });
    res.json(user);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}