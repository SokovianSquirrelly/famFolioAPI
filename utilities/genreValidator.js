const { body, param } = require("express-validator");

const genreValidator = {};

// POST Genre
genreValidator.validateGenreForCreate = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional(),
];

// PUT Genre
genreValidator.validateGenreForUpdate = [
  param("id").notEmpty().withMessage("Genre ID is required"),
  body("name").optional(),
  body("description").optional(),
];

// DELETE Genre
genreValidator.validateGenreIdForDelete = [
  param("id").notEmpty().withMessage("Genre ID is required"),
];

module.exports = genreValidator;
