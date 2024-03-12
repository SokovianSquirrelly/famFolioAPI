const express = require("express");
const router = express.Router();
const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./userRoutes");
const accountTypeRoutes = require("./accountTypeRoutes");
const categoryRoutes = require("./categoryRoutes");
const genreRoutes = require("./genreRoutes");
const mediaRoutes = require("./mediaRoutes");
const swagger = require("./swaggerRoutes");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

// Routes
router.use("/user", checkJwt, userRoutes);
router.use("/accountType", checkJwt, accountTypeRoutes);
router.use("/category", checkJwt, categoryRoutes);
router.use("/genre", checkJwt, genreRoutes);
router.use("/media", checkJwt, mediaRoutes);
router.use("/api-docs", swagger);

module.exports = router;
