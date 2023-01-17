import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";

export const validateJob = initMiddleware(
  validateMiddleware([
      check('jobRole').isLength({min:2}),
      check('jobDescription').isLength({min:5}),
      check('salary').isLength({min:5}).optional({ nullable: true }),
      check('jobType').isLength({min:5}).optional({ nullable: true }),
      check('jobLength').isLength({min:2}).optional({ nullable: true }),
      check('isOpen').isBoolean().optional({ nullable: true })
  ], validationResult)
)
