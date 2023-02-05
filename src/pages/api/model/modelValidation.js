import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateModel = initMiddleware(
  validateMiddleware([
    check('email').isEmail(),
    check('firstname').isLength({min:5}),
    check('lastname').isLength({min:5}),
    check('height').isLength({min:3}),
    check('bust').isLength({min:2}),
    check('waist').isLength({min:2}),
    check('hip').isLength({min:2}),
    check('shoeSize').isLength({min:2}),
    check('weight').isLength({min:2}),
    check('complexion').isLength({min:4}),
    check('DOB').isLength({min:5}),
    check('social').isObject(),
    check('state').isLength({min:2}),
    check('country').isLength({min:2}),
    check('address').isLength({min:7}),
    check('isAvailable').isBoolean(),
    check('phone').isObject(),
    check('bio').isLength({min:10}).optional({ nullable: true }),
  ], validationResult)
)