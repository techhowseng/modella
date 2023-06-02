import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";
import { validationResult } from 'express-validator';
import { bodyPermittedParams } from "helper/util";
import MediaRepository from "./repository";
import { validateDeleteImage } from "./mediaValidation";

interface Request extends NextApiRequest {
  file: string,
  files: string,
  
}

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

const uploadMiddleware = upload.array('content', 5);
apiRoute.use(uploadMiddleware);

apiRoute.post(async(
  req: Request,
  res: NextApiResponse
) => {
  res.json(await MediaRepository.uploadMedia(req, res));
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
  await validateDeleteImage(req, res)
  const createErrors = validationResult(req)
  if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
  bodyPermittedParams(req);
  res.json(await MediaRepository.deleteMedia(req, res));
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
