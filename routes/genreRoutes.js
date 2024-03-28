import express from "express";
const genreRouter = express.Router();
import genreController from "../controllers/genreController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/genreValidator.js";
import { checkAdmin } from "../middleware/user.js";

// Routes

// GET all genres
genreRouter.get("/", utilities.handleErrors(genreController.getAllGenres));

// GET single genre by id
genreRouter.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(genreController.getGenreById)
);

// POST new genre
genreRouter.post(
  "/",
  // validate.validateGenre,
  utilities.handleErrors(genreController.addGenre)
);

// PUT update genre
genreRouter.put(
  "/:id",
  checkAdmin,
  // validate.validateUpdateGenre,
  utilities.handleErrors(genreController.updateGenre)
);

// DELETE genre
genreRouter.delete(
  "/:id",
  checkAdmin,
  // validate.validateDeleteGenre,
  utilities.handleErrors(genreController.deleteGenre)
);

// POST bulk genres
genreRouter.post(
  "/bulk",
  utilities.handleErrors(genreController.addBulkGenres)
);

// PUT bulk update genres
genreRouter.put(
  "/bulk",
  utilities.handleErrors(genreController.updateBulkGenres)
);

// DELETE bulk genres
genreRouter.delete(
  "/bulk",
  utilities.handleErrors(genreController.deleteBulkGenres)
);

export default genreRouter;
