import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

const userTypes = ['Model','Client', 'Admin'];

export const validateUser = initMiddleware(
  validateMiddleware([
      check('email').isEmail()
      .withMessage('is not a valid email.'),
      check('password').isLength({min:5})
      .withMessage('is too short.'),
      check('type').isIn(userTypes)
      .withMessage('has to be a Model or a Client.'),
  ], validationResult)
)

export const validateUpdateUser = initMiddleware(
  validateMiddleware([
      check('email').isEmail().optional({ nullable: true })
      .withMessage('is not a valid email.'),
      check('password').isLength({min:5}).optional({ nullable: true })
      .withMessage('is too short.'),
      check('type').isIn(userTypes).optional({ nullable: true })
      .withMessage('has to be a Model or a Client.'),
  ], validationResult)
)