import express from "express";
const categoryRouter = express.Router();
import categoryController from "../controllers/categoryController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/categoryValidator.js";
import { checkAdmin } from "../middleware/user.js";

// Routes

// GET all categories
categoryRouter.get(
  "/",
  utilities.handleErrors(categoryController.getAllCategories)
);

// GET single category by id
categoryRouter.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(categoryController.getCategoryById)
);

// POST new category
categoryRouter.post(
  "/",
  // validate.validateCategory,
  utilities.handleErrors(categoryController.addCategory)
);

// PUT update category
categoryRouter.put(
  "/:id",
  checkAdmin,
  // validate.validateUpdateCategory,
  utilities.handleErrors(categoryController.updateCategory)
);

// DELETE category
categoryRouter.delete(
  "/:id",
  checkAdmin,
  // validate.validateDeleteCategory,
  utilities.handleErrors(categoryController.deleteCategory)
);

// POST bulk categories
categoryRouter.post(
  "/bulk",
  utilities.handleErrors(categoryController.addBulkCategories)
);

// PUT bulk update categories
categoryRouter.put(
  "/bulk",
  utilities.handleErrors(categoryController.updateBulkCategories)
);

// DELETE bulk categories
categoryRouter.delete(
  "/bulk",
  utilities.handleErrors(categoryController.deleteBulkCategories)
);

export default categoryRouter;
