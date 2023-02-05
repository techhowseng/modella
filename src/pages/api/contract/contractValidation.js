import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateContract = initMiddleware(
  validateMiddleware([
    check('status').isIn(['Ongoing','Done']),
    check('modelId').isInt(),
    check('locations').isObject(),
    check('startDate').isLength({min:3}),
    check('startTime').isLength({min:3}),
    check('hours').isLength({min:1}),
    check('days').isLength({min:1}),
    check('fee').isLength({min:3}),
  ], validationResult)
)
