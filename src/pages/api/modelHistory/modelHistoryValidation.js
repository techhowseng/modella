import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";

export const validateModelHistory = initMiddleware(
  validateMiddleware([
      check('job').isLength({ min: 3 }),
      check('description').isLength({ min:5 }),
  ], validationResult)
)
