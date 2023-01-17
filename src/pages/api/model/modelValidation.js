import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";

export const validateModel = initMiddleware(
  validateMiddleware([
    check('email').isEmail(),
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
  ], validationResult)
)