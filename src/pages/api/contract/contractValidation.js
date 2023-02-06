import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateContract = initMiddleware(
  validateMiddleware([
    check('status').isIn(['Ongoing','Done'])
    .withMessage('options must either be Ongoing or Done.'),,
    check('modelId').isInt()
    .withMessage('is not a valid number.'),,
    check('locations')
    .isObject()
    .withMessage('must be defined in an object.'),
    check('startDate').isLength({min:3})
    .withMessage('is not descriptive enough.'),
    check('startTime').isLength({min:3})
    .withMessage('is not descriptive enough.'),
    check('hours').isLength({min:1})
    .withMessage('is not descriptive enough.'),
    check('days').isLength({min:1})
    .withMessage('is not descriptive enough.'),
    check('fee').isLength({min:3})
    .withMessage('is not descriptive enough.'),
  ], validationResult)
)
