const { body, param } = require("express-validator");

const accountTypeValidator = {};

// POST Account Type
accountTypeValidator.validateAccountTypeForCreate = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional(),
];

// PUT Account Type
accountTypeValidator.validateAccountTypeForUpdate = [
  param("id").notEmpty().withMessage("Account Type ID is required"),
  body("name").optional(),
  body("description").optional(),
];

// DELETE Account Type
accountTypeValidator.validateAccountTypeIdForDelete = [
  param("id").notEmpty().withMessage("Account Type ID is required"),
];

module.exports = accountTypeValidator;
