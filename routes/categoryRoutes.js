const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const utilities = require("../utilities");
const validate = require("../utilities/categoryValidator");

// Routes

// GET all categories
router.get("/", utilities.handleErrors(categoryController.getAllCategories));

// GET single category by id
router.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(categoryController.getCategoryById)
);

// POST new category
router.post(
  "/",
  // validate.validateCategory,
  utilities.handleErrors(categoryController.addCategory)
);

// PUT update category
router.put(
  "/:id",
  // validate.validateUpdateCategory,
  utilities.handleErrors(categoryController.updateCategory)
);

// DELETE category
router.delete(
  "/:id",
  // validate.validateDeleteCategory,
  utilities.handleErrors(categoryController.deleteCategory)
);

module.exports = router;
