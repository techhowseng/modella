import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect';
import multer from 'multer';
import ModelRepository from "./repository/index";

const upload = multer({ 
  storage: multer.memoryStorage() 
})

const apiRoute = nextConnect({
  onError(
    error,
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single('image');
apiRoute.use(uploadMiddleware);

apiRoute.post(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await ModelRepository.uploadThumbnail(req, res);
});

apiRoute.put(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await ModelRepository.updateThumbnail(req, res);
});

apiRoute.delete(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await ModelRepository.deleteThumbnail(req, res);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
