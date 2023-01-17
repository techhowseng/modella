import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";

export const validateMedia = initMiddleware(
  validateMiddleware([
      check('content').isObject().optional,
      check('contentType').isIn(['DEFAULT','PROFILE', 'GALLERY', 'MISC']),
  ], validationResult)
)