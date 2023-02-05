import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateClient = initMiddleware(
  validateMiddleware([
      check('email').isEmail(),
      check('social').isObject().optional({ nullable: true }),
      check('state').isLength({min:2}),
      check('country').isLength({min:2}),
      check('address').isLength({min:5}),
      check('phone').isObject(),
      check('companyName').isLength({min:2}),
  ], validationResult)
)
