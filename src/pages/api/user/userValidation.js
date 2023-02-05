import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateUser = initMiddleware(
  validateMiddleware([
      check('email').isEmail(),
      check('password').isLength({min:5}),
      check('type').isIn(['Model','Client', 'Admin'])
  ], validationResult)
)

export const validateUpdateUser = initMiddleware(
  validateMiddleware([
      check('email').isEmail().optional({ nullable: true }),
      check('password').isLength({min:5}).optional({ nullable: true }),
      check('type').isIn(['Model','Client']).optional({ nullable: true }),
  ], validationResult)
)