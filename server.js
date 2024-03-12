require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database/connection");

const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Connect to database
connectDatabase().then(() => {
  // Use routes
  app.use(require("./routes"));

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong");
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
