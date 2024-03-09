const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const utilities = require("../utilities");
const validate = require("../utilities/mediaValidator");

// Routes

// GET all media
router.get("/", utilities.handleErrors(mediaController.getAllMedia));

// GET single media by id
router.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(mediaController.getMediaById)
);

// POST new media
router.post(
  "/",
  // validate.validateMedia,
  utilities.handleErrors(mediaController.addMedia)
);

// PUT update media
router.put(
  "/:id",
  // validate.validateUpdateMedia,
  utilities.handleErrors(mediaController.updateMedia)
);

// DELETE media
router.delete(
  "/:id",
  // validate.validateDeleteMedia,
  utilities.handleErrors(mediaController.deleteMedia)
);

module.exports = router;
