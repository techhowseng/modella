import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateCreateContract = initMiddleware(
  validateMiddleware([
    check('modelId').isInt()
    .withMessage('is not a valid number.'),
    check('jobId').isLength({min:25})
    .withMessage('The Job ID is incorrect.')
  ], validationResult)
)

export const validateUpdateContract = initMiddleware(
  validateMiddleware([
    check('status').isIn(['Ongoing', 'Cancelled', 'Done'])
    .optional({ nullable: true })
    .withMessage('Options must either be Ongoing, Cancelled or Done.'),
    check('pid').isLength({min:25})
    .optional({ nullable: true })
    .withMessage('Contract ID is not the right length.'),
    check('agreed').isBoolean().withMessage('Agreed property only accepts boolean')
    .optional({ nullable: true })
  ], validationResult)
)
