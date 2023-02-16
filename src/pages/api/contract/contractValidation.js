import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateCreateContract = initMiddleware(
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

export const validateUpdateContract = initMiddleware(
  validateMiddleware([
    check('status').isIn(['Ongoing','Done'])
    .optional({ nullable: true })
    .withMessage('options must either be Ongoing or Done.'),,
    check('modelId').isInt()
    .optional({ nullable: true })
    .withMessage('is not a valid number.'),,
    check('locations')
    .optional({ nullable: true })
    .isObject()
    .withMessage('must be defined in an object.'),
    check('startDate').isLength({min:3})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('startTime').isLength({min:3})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('hours').isLength({min:1})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('days').isLength({min:1})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('fee').isLength({min:3})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
  ], validationResult)
)
