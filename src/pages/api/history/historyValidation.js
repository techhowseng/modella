import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateCreateHistory = initMiddleware(
  validateMiddleware([
      check('job')
      .isLength({ min: 3 })
      .withMessage('input is too short.'),
      check('description')
      .isLength({ min:5 })
      .withMessage('must be more detailed.'),
  ], validationResult)
)

export const validateUpdateHistory = initMiddleware(
  validateMiddleware([
      check('job')
      .optional({ nullable: true })
      .isLength({ min: 3 })
      .withMessage('input is too short.'),
      check('description')
      .optional({ nullable: true })
      .isLength({ min:5 })
      .withMessage('must be more detailed.'),
  ], validationResult)
)
