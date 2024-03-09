const { body, param } = require("express-validator");

const userValidator = {};

// POST User
userValidator.validateUserForCreate = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// PUT User
userValidator.validateUserForUpdate = [
  param("id").notEmpty().withMessage("User ID is required"),
  body("username").optional(),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// DELETE User
userValidator.validateUserIdForDelete = [
  param("id").notEmpty().withMessage("User ID is required"),
];

module.exports = userValidator;
