import express from "express";
const UserRouter = express.Router();
import usersController from "../controllers/usersController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/userValidator.js";
import { checkManager, checkAdmin } from "../middleware/user.js";

// Routes

// GET all users
/**
 * @swagger
 * /user/:
 *   get:
 *     description: Returns users
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/problem+json:
 *             schema:
 *               type: object
 */
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

// GET single user by user_id
UserRouter.get(
  "/self/:userId",
  utilities.handleErrors(usersController.getUserByUserId)
);

// POST new user
UserRouter.post("/", utilities.handleErrors(usersController.addUser));

// PUT update user
UserRouter.put(
  "/:id",
  checkAdmin,
  utilities.handleErrors(usersController.updateUser)
);

// DELETE user
UserRouter.delete(
  "/:id",
  checkAdmin,
  utilities.handleErrors(usersController.deleteUser)
);

export default UserRouter;
