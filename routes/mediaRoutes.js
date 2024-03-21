import express from "express";
const mediaRouter = express.Router();
import mediaController from "../controllers/mediaController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/mediaValidator.js";
import { checkAdmin } from "../middleware/user.js";

// Routes

// GET all media
mediaRouter.get("/", utilities.handleErrors(mediaController.getAllMedia));

// GET single media by id
mediaRouter.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(mediaController.getMediaById)
);

// POST new media
mediaRouter.post(
  "/",
  // validate.validateMedia,
  utilities.handleErrors(mediaController.addMedia)
);

// PUT update media
mediaRouter.put(
  "/:id",
  checkAdmin,
  // validate.validateUpdateMedia,
  utilities.handleErrors(mediaController.updateMedia)
);

// DELETE media
mediaRouter.delete(
  "/:id",
  checkAdmin,
  // validate.validateDeleteMedia,
  utilities.handleErrors(mediaController.deleteMedia)
);

export default mediaRouter;
