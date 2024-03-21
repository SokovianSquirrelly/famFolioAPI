import { body, param } from "express-validator";

const categoryValidator = {};

// POST Category
categoryValidator.validateCategoryForCreate = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional(),
];

// PUT Category
categoryValidator.validateCategoryForUpdate = [
  param("id").notEmpty().withMessage("Category ID is required"),
  body("name").optional(),
  body("description").optional(),
];

// DELETE Category
categoryValidator.validateCategoryIdForDelete = [
  param("id").notEmpty().withMessage("Category ID is required"),
];

export default categoryValidator;
