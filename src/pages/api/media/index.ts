import { validationResult } from "express-validator";
import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";
import { validateCreateMedia, validateUploadImages } from "./mediaValidation";
import MediaRepository from "./repository";

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

const uploadMiddleware = upload.single('content');
apiRoute.use(uploadMiddleware);

apiRoute.post(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.json(await MediaRepository.createMedia(req, res));
});

apiRoute.get(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.json(await MediaRepository.getMedia(req, res));
});

apiRoute.put(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.json(await MediaRepository.updateMedia(req, res));
});

apiRoute.delete(async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.json(await MediaRepository.deleteMedia(req, res));
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
