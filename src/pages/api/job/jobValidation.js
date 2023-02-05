import { check, validationResult } from 'express-validator';
import initMiddleware from "../../../lib/middlewares/init-middleware";
import validateMiddleware from "../../../lib/middlewares/validate-middleware";

const types = [
  "All",
  "FashionEditorial",
  "FashionCatalog",
  "Commercial",
  "Mature",
  "Runway",
  "Swimsuit",
  "Lingerie",
  "Fitness",
  "Fit",
  "Parts",
  "Promotional",
  "Glamour",
  "Child",
  "Petite",
  "PlusSize",
  "Freelance",
  "Print",
  "Other"
];

export const validateCreateJob = initMiddleware(
  validateMiddleware([
      check('jobRole').isLength({min:2}),
      check('jobDescription').isLength({min:5}),
      check('locations').isObject(),
      check('salary').isLength({min:5}).optional({ nullable: true }),
      check('jobType').isIn(types).optional({ nullable: true }),
      check('jobLength').isLength({min:2}).optional({ nullable: true }),
      check('isOpen').isBoolean().optional({ nullable: true })
  ], validationResult)
)

export const validateUpdateJob = initMiddleware(
  validateMiddleware([
      check('jobRole').isLength({min:2}).optional({ nullable: true }),
      check('jobDescription').isLength({min:5}).optional({ nullable: true }),
      check('locations').isObject().optional({ nullable: true }),
      check('salary').isLength({min:5}).optional({ nullable: true }),
      check('jobType').isIn(types).optional({ nullable: true }),
      check('jobLength').isLength({min:2}).optional({ nullable: true }),
      check('isOpen').isBoolean().optional({ nullable: true })
  ], validationResult)
)