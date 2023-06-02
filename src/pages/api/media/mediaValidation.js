import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateCreateMedia = initMiddleware(
  validateMiddleware([
      check('content').isObject(),
      check('contentType').isIn(['Thumbnail','ProfileImages', 'Gallery', 'Misc']),
  ], validationResult)
)
  
export const validateUploadImages = initMiddleware(
  validateMiddleware([
    check('content').isObject(),
    check('content.potrait').isObject(),
    check('content.headshot').isObject(),
    check('content.smile').isObject(),
    check('content.body').isObject(),
    check('contentType').isIn(['ProfileImages']),
  ], validationResult)
)

export const validateDeleteImage = initMiddleware(
  validateMiddleware([
    check('id').isLength({min:1})
    .withMessage('The image ID is not valid.'),
    check('public_id').isLength({min:46})
    .withMessage('The userId is not valid.'),
  ], validationResult)
)
