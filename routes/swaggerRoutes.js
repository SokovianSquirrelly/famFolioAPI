const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

if (process.env.NODE_ENV === "development") {
  swaggerDocument.host = "localhost:8080";
  swaggerDocument.schemes = ["http"];
}

// Swagger UI route
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

module.exports = router;
