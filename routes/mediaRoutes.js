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

// GET media by user id
mediaRouter.get(
  "/:userId",
  utilities.handleErrors(mediaController.getMediaByUserId)
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
  // validate.validateUpdateMedia,
  utilities.handleErrors(mediaController.updateMedia)
);

// DELETE media
mediaRouter.delete(
  "/:id",
  // validate.validateDeleteMedia,
  utilities.handleErrors(mediaController.deleteMedia)
);

// POST bulk media
mediaRouter.post("/bulk", utilities.handleErrors(mediaController.addBulkMedia));

// PUT bulk update media
mediaRouter.put(
  "/bulk",
  utilities.handleErrors(mediaController.updateBulkMedia)
);

// DELETE bulk media
mediaRouter.delete(
  "/bulk",
  utilities.handleErrors(mediaController.deleteBulkMedia)
);

export default mediaRouter;
