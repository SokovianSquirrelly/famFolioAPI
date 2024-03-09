const express = require("express");
const router = express.Router();
const swagger = require("./swaggerRoutes");

// Import routes
const userRoutes = require("./userRoutes");
const accountTypeRoutes = require("./accountTypeRoutes");
const categoryRoutes = require("./categoryRoutes");
const genreRoutes = require("./genreRoutes");
const mediaRoutes = require("./mediaRoutes");

// Routes
router.use("/user", userRoutes);
router.use("/accountType", accountTypeRoutes);
router.use("/category", categoryRoutes);
router.use("/genre", genreRoutes);
router.use("/media", mediaRoutes);
router.use("/api-docs", swagger);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.stack);
  } else {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
