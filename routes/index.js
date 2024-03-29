import express from "express";
const router = express.Router();
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
dotenv.config();

import UserRouter from "./userRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import genreRouter from "./genreRoutes.js";
import mediaRouter from "./mediaRoutes.js";
import swagger from "./swaggerRoutes.js";
import { checkUser, checkManager } from "../middleware/user.js";
import handleErrors from "../middleware/errorMiddleware.js";

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

// Routes
router.use("/user", checkJwt, checkUser, checkManager, UserRouter);
router.use("/category", checkJwt, checkUser, categoryRouter);
router.use("/genre", checkJwt, checkUser, genreRouter);
router.use("/media", checkJwt, checkUser, mediaRouter);
router.use("/api-docs", swagger);

// Error handling middleware goes after the routes
router.use(handleErrors);

export default router;
