import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

export const validateCreateClient = initMiddleware(
  validateMiddleware([
      check('social')
      .isObject()
      .optional({ nullable: true })
      .withMessage('must be defined in an object.'),
      check('state')
      .optional({ nullable: true })
      .isLength({min:2})
      .withMessage('is not valid as it is too short.'),
      check('country')
      .optional({ nullable: true })
      .isLength({min:2})
      .withMessage('is not valid as it is too short.'),
      check('address').isLength({min:5})
      .optional({ nullable: true })
      .withMessage('is not valid as it is too short.'),
      check('phone')
      .optional({ nullable: true })
      .isObject()
      .withMessage('must be defined in an object.'),
      check('companyName')
      .optional({ nullable: true })
      .isLength({min:2})
      .withMessage('is not valid as it is too short.'),
  ], validationResult)
)

export const validateUpdateClient = initMiddleware(
  validateMiddleware([
      check('social')
      .isObject()
      .optional({ nullable: true })
      .withMessage('must be defined in an object.'),
      check('state')
      .isLength({min:2})
      .optional({ nullable: true })
      .withMessage('is not valid as it is too short.'),
      check('country')
      .isLength({min:2})
      .withMessage('is not valid as it is too short.'),
      check('address').isLength({min:5})
      .withMessage('is not valid as it is too short.'),
      check('phone')
      .isObject()
      .withMessage('must be defined in an object.'),
      check('companyName')
      .isLength({min:2})
      .withMessage('is not valid as it is too short.'),
  ], validationResult)
)