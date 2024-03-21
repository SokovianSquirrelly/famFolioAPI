import { validationResult } from "express-validator";

const utilities = {};

// Middleware for error handling
utilities.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// generic use

// router.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//       return res.status(401).send({ msg: 'Invalid token' });
//   }

//   next(err, req, res);
// });

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default utilities;
