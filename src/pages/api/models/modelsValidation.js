import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateModelsGet = initMiddleware(
  validateMiddleware([
    check('params').isLength({min:1}).optional({ nullable: true }),
    check('height').isLength({min:3}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('bust').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('waist').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('hip').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('shoeSize').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('weight').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('complexion').isLength({min:4}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('dob').isISO8601().toDate().optional({ nullable: true })
    .withMessage('is not written in the right format.'),
    check('state').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not long enough.'),
    check('country').isLength({min:2}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('bio').isLength({min:3}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('page').isLength({min:1}).isNumeric().optional({ nullable: true })
    .withMessage('page number is invalid.'),
  ], validationResult)
)
