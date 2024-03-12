const express = require("express");
const router = express.Router();
const { auth } = require("express-oauth2-jwt-bearer");

const userRoutes = require("./userRoutes");
const accountTypeRoutes = require("./accountTypeRoutes");
const categoryRoutes = require("./categoryRoutes");
const genreRoutes = require("./genreRoutes");
const mediaRoutes = require("./mediaRoutes");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "{yourApiIdentifier}",
  issuerBaseURL: `https://dev-ofqugjdj7o7861mc.us.auth0.com/`,
});

// Routes
router.use("/user", checkJwt, userRoutes);
router.use("/accountType", checkJwt, accountTypeRoutes);
router.use("/category", checkJwt, categoryRoutes);
router.use("/genre", checkJwt, genreRoutes);
router.use("/media", checkJwt, mediaRoutes);
router.use("/api-docs", swagger);

module.exports = router;
