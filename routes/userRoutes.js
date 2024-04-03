import express from "express";
const UserRouter = express.Router();
import usersController from "../controllers/usersController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/userValidator.js";
import { checkManager, checkAdmin } from "../middleware/user.js";

// Routes

// GET single user
UserRouter.get(
  "/myself/",
  utilities.handleErrors(usersController.getUserByUserId)
);
// GET all users
UserRouter.get(
  "/",
  checkManager,
  utilities.handleErrors(usersController.getAllUsers)
);

// GET single user by id
UserRouter.get(
  "/:id",
  checkManager,
  utilities.handleErrors(usersController.getUserById)
);

// POST new user
UserRouter.post("/", utilities.handleErrors(usersController.addUser));

// PUT update user
UserRouter.put(
  "/:id",
  checkAdmin,
  utilities.handleErrors(usersController.updateUser)
);

// DELETE my
UserRouter.delete(
  "/myself",
  utilities.handleErrors(usersController.deleteMyself)
);

// DELETE user
UserRouter.delete(
  "/:id",
  checkAdmin,
  utilities.handleErrors(usersController.deleteUser)
);

export default UserRouter;
