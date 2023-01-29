import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateUser = initMiddleware(
  validateMiddleware([
      check('email').isEmail(),
      check('password').isLength({min:5}),
      check('type').isIn(['Model','Client']).optional({ nullable: true }),
  ], validationResult)
)
