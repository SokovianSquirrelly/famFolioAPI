import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import routes from "./routes/index.js";

const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Connect to database
connectDatabase().then(() => {
  // Use routes
  app.use(routes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    if (!err.status) {
      // If the error doesn't have a status, default to 500 (Internal Server Error)
      err.status = 500;
    }

    // Set the content-type to application/problem+json
    res.setHeader("Content-Type", "application/problem+json");

    // Construct the problem object
    const problemJson = {
      type: "about:blank",
      title: err.title || "Internal Server Error",
      status: err.status,
      detail: err.detail || "An unexpected error occurred",
      instance: req.originalUrl,
      // Additional RFC 9457 fields
      correlationId: req.headers["correlation-id"] || null,
      errors: err.errors || null,
    };

    // Send the response
    res.status(err.status).json(problemJson);
  });

  // Start the server
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080} `);
    console.log(
      `Click on the link to view the API documentation: http://localhost:${
        process.env.PORT || 8080
      }/api-docs`
    );
  });
});
