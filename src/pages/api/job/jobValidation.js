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
      check('jobRole').isLength({min:2})
      .withMessage('is not descriptive enough.'),
      check('jobDescription').isLength({min:5})
      .withMessage('is not descriptive enough.'),
      check('locations').isLength({min:3})
      .withMessage('is not descriptive enough.')
      .optional({ nullable: true }),
      check('fee').isLength({min:3}).optional({ nullable: true })
      .withMessage('is not descriptive enough.'),
      check('jobType').isIn(types).optional({ nullable: true })
      .withMessage('is not among the available options.'),
      check('startDate').isISO8601().toDate().optional({ nullable: true })
      .withMessage('is not descriptive enough.'),
      check('startTime').isISO8601().toDate().optional({ nullable: true })
      .withMessage('is not descriptive enough.'),
      check('hours').isLength({min:1}).isNumeric().optional({ nullable: true })
      .withMessage('is not a valid length of time.'),
      check('days').isLength({min:1}).isNumeric().optional({ nullable: true })
      .withMessage('is not a valid day.'),
      check('experience').isLength({min:5}).optional({ nullable: true })
      .withMessage('is not descriptive enough.'),
      check('isOpen').isBoolean().optional({ nullable: true })
      .withMessage('should be true or false.'),
  ], validationResult)
)

export const validateUpdateJob = initMiddleware(
  validateMiddleware([
    check('jobRole').isLength({min:2})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('jobDescription').isLength({min:5})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('locations').isLength({min:3})
    .withMessage('is not descriptive enough.')
    .optional({ nullable: true }),
    check('salary').isLength({min:3}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('jobType').isIn(types).optional({ nullable: true })
    .withMessage('is not among the available options.'),
    check('startDate').isISO8601().toDate().optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('startTime').isISO8601().toDate().optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('hours').isLength({min:1}).isNumeric().optional({ nullable: true })
    .withMessage('is not a valid length of time.'),
    check('days').isLength({min:1}).isNumeric().optional({ nullable: true })
    .withMessage('is not a valid day.'),
    check('experience').isLength({min:5}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('isOpen').isBoolean().optional({ nullable: true })
    .withMessage('should be true or false.'),
  ], validationResult)
)

export const validateSearchJob = initMiddleware(
  validateMiddleware([
    check('pid').isLength({min:1}),
    check('jobRole').isLength({min:4})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('jobDescription').isLength({min:5})
    .optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('locations').isLength({min:3})
    .withMessage('is not descriptive enough.')
    .optional({ nullable: true }),
    check('salary').isLength({min:3}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('jobType').isIn(types).optional({ nullable: true })
    .withMessage('is not among the available options.'),
    check('startDate').isISO8601().toDate().optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('startTime').isISO8601().toDate().optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('hours').isLength({min:1}).isNumeric().optional({ nullable: true })
    .withMessage('is not a valid length of time.'),
    check('days').isLength({min:1}).isNumeric().optional({ nullable: true })
    .withMessage('is not a valid day.'),
    check('experience').isLength({min:5}).optional({ nullable: true })
    .withMessage('is not descriptive enough.'),
    check('isOpen').isBoolean().optional({ nullable: true })
    .withMessage('should be true or false.'),
  ], validationResult)
)
