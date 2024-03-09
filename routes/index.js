const express = require("express");
const router = express.Router();
const swagger = require("./swaggerRoutes.js");
const contacts = require("./contactRoutes.js");

// Routes
router.use("/api-docs", swagger);
router.use("/contacts", contacts);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

module.exports = router;
