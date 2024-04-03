import express from "express";
const mediaRouter = express.Router();
import mediaController from "../controllers/mediaController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/mediaValidator.js";
import { checkManager, checkAdmin } from "../middleware/user.js";

// Routes

// GET media by user id
mediaRouter.get(
  "/my/:userId",
  utilities.handleErrors(mediaController.getMyMediaByUserId)
);

// PUT update 'my' media
mediaRouter.put(
  "/my/:userId",
  utilities.handleErrors(mediaController.updateMyMediaByUserId)
);

// DELETE 'my' media
mediaRouter.delete(
  "/my/:userId",
  utilities.handleErrors(mediaController.deleteMyMediaByUserId)
);

// GET all media
mediaRouter.get("/", utilities.handleErrors(mediaController.getAllMedia));

// GET single media by id
mediaRouter.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(mediaController.getMediaById)
);

// POST new media
mediaRouter.post("/", utilities.handleErrors(mediaController.addMedia));
// POST bulk media
mediaRouter.post("/bulk", utilities.handleErrors(mediaController.addBulkMedia));

// PUT update media
mediaRouter.put(
  "/:id",
  checkAdmin,
  utilities.handleErrors(mediaController.updateMedia)
);

// DELETE media
mediaRouter.delete(
  "/:id",
  checkAdmin,
  utilities.handleErrors(mediaController.deleteMedia)
);

// PUT bulk update media
mediaRouter.put(
  "/bulk",
  checkAdmin,
  utilities.handleErrors(mediaController.updateBulkMedia)
);

// DELETE bulk media
mediaRouter.delete(
  "/bulk",
  checkAdmin,
  utilities.handleErrors(mediaController.deleteBulkMedia)
);

export default mediaRouter;
