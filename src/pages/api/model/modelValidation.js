import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateCreateModel = initMiddleware(
  validateMiddleware([
    check('firstname').isLength({min:2})
    .withMessage('is not long enough.'),
    check('lastname').isLength({min:2})
    .withMessage('is not long enough.'),
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
    check('DOB').isLength({min:5})
    .withMessage('is not written in the right format.'),
    check('social').isObject().optional({ nullable: true })
    .withMessage('should be sent as an object.'),
    check('state').isLength({min:2})
    .withMessage('is not long enough.'),
    check('country').isLength({min:2})
    .withMessage('is not descriptive enough.'),
    check('address').isLength({min:7})
    .withMessage('is too short.'),,
    check('isAvailable').isBoolean().optional({ nullable: true })
    .withMessage('should be true or false.'),,
    check('phone').isObject()
    .withMessage('should be sent as an object.'),
    check('bio').isLength({min:10}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
  ], validationResult)
)

export const validateUpdateModel = initMiddleware(
  validateMiddleware([
    check('firstname').isLength({min:2})
    .optional({ nullable: true })
    .withMessage('is not long enough.'),
    check('lastname').isLength({min:2})
    .optional({ nullable: true })
    .withMessage('is not long enough.'),
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
    check('DOB').isLength({min:5})
    .optional({ nullable: true })
    .withMessage('is not written in the right format.'),
    check('social').isObject().optional({ nullable: true })
    .withMessage('should be sent as an object.'),
    check('state').isLength({min:2})
    .optional({ nullable: true })
    .withMessage('is not long enough.'),
    check('country').isLength({min:2})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('address').isLength({min:7})
    .optional({ nullable: true })
    .withMessage('is too short.'),,
    check('isAvailable').isBoolean().optional({ nullable: true })
    .withMessage('should be true or false.'),,
    check('phone').isObject()
    .optional({ nullable: true })
    .withMessage('should be sent as an object.'),
    check('bio').isLength({min:10}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
  ], validationResult)
)