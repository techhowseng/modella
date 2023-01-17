import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";

export const validateContract = initMiddleware(
  validateMiddleware([
    check('status').isIn(['ONGOING','DONE']),
    check('clientId').isInt(),
    check('modelId').isInt()
  ], validationResult)
)
