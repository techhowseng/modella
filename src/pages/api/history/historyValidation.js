import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateModelHistory = initMiddleware(
  validateMiddleware([
      check('job').isLength({ min: 3 }),
      check('description')
      .isLength({ min:5 })
      .withMessage('must be at least 5 chars long'),
  ], validationResult)
)
