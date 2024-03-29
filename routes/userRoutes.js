import express from "express";
const UserRouter = express.Router();
import usersController from "../controllers/usersController.js";
import utilities from "../utilities/index.js";
import validate from "../utilities/userValidator.js";
import { checkAdmin } from "../middleware/user.js";

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
UserRouter.get("/", utilities.handleErrors(usersController.getAllUsers));

// GET single user by id
UserRouter.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(usersController.getUserById)
);

// POST new user
UserRouter.post(
  "/",
  // validate.validateUser,
  utilities.handleErrors(usersController.addUser)
);

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
  // validate.validateDeleteUser,
  utilities.handleErrors(usersController.deleteUser)
);

export default UserRouter;
