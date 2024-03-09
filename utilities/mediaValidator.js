const { body, param } = require("express-validator");

const mediaValidator = {};

// POST Media
mediaValidator.validateMediaForCreate = [
  body("title").notEmpty().withMessage("Title is required"),
  body("url").notEmpty().withMessage("URL is required"),
  body("description").optional(),
];

// PUT Media
mediaValidator.validateMediaForUpdate = [
  param("id").notEmpty().withMessage("Media ID is required"),
  body("title").optional(),
  body("url").optional(),
  body("description").optional(),
];

// DELETE Media
mediaValidator.validateMediaIdForDelete = [
  param("id").notEmpty().withMessage("Media ID is required"),
];

module.exports = mediaValidator;
