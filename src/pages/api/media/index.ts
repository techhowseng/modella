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

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;
//   switch (method) {
//     case "GET":
//       if (req.body.userId && req.body.type) return res.json(await MediaRepository.getMediaByType(req, res));
//       if (req.body.id && !req.body.userId) return res.json(await MediaRepository.getMedia(req, res));
//       if (req.body.userId && !req.body.id) return res.json(await MediaRepository.getMediaByUser(req, res));
//       ResponseService.sendError({ message: "Bad request"}, res);
//       break;
//     case "POST":
//       // @ts-ignore
//       console.log("-----------------------------",  JSON.parse(req.data))
//       if (req.body.content.potrait) {
//         await validateUploadImages(req, res)
//         const createErrors = validationResult(req)
//         if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
//         res.json(await MediaRepository.uploadProfileImages(req, res));
//       } else {
//         await validateCreateMedia(req, res)
//         const createErrors = validationResult(req)
//         if (!createErrors.isEmpty()) return res.status(422).json({ errors: createErrors.array() });
//         res.json(await MediaRepository.createMedia(req, res));
//       }
//       break;
//     case "PUT":
//       if (req.body.type == "profile") {
//         res.json(await MediaRepository.updateProfileImages(req, res));
//       } else {
//         await validateCreateMedia(req, res)
//         const updateErrors = validationResult(req)
//         if (!updateErrors.isEmpty()) return res.status(422).json({ errors: updateErrors.array() });
//         res.json(await MediaRepository.updateMedia(req, res));
//       }
//       break;
//     case "PATCH":
//       break;
//     case "DELETE":
//       res.json(await MediaRepository.deleteMedia(req, res));
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

