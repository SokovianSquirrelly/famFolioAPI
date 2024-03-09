const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../utilities");
const validate = require("../utilities/userValidator");

// Routes

// GET all users
router.get("/", utilities.handleErrors(usersController.getAllUsers));

// GET single user by id
router.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(usersController.getUserById)
);

// POST new user
router.post(
  "/",
  // validate.validateUser,
  utilities.handleErrors(usersController.addUser)
);

// PUT update user
router.put(
  "/:id",
  // validate.validateUpdateUser,
  utilities.handleErrors(usersController.updateUser)
);

// DELETE user
router.delete(
  "/:id",
  // validate.validateDeleteUser,
  utilities.handleErrors(usersController.deleteUser)
);

module.exports = router;
