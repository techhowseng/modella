import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";

export const validateUser = initMiddleware(
  validateMiddleware([
      check('email').isEmail(),
      check('password').isLength({min:5}),
      check('firstname').isLength({min:5}),
      check('lastname').isEmail(),
      check('age').isLength({min:5}),
      check('height').isEmail(),
      check('DOB').isLength({min:5}),
      check('social').isObject(),
      check('state').isLength({min:2}),
      check('country').isLength({min:2}),
      check('address').isLength({min:5}),
      check('isAvailable').isBoolean(),
      check('phone').isObject(),
      check('phone.number_1').isMobilePhone().optional({ nullable: true }),
      check('companyName').isLength({min:2}),
      check('type').isIn(['MODEL','CLIENT']).optional({ nullable: true }),
  ], validationResult)
)
