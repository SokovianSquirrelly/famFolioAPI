import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import routes from "./routes/index.js";
import handleErrors from "./middleware/errorMiddleware.js"; // Import the error handling middleware

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
  app.use(handleErrors); // Use the imported error handling middleware

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
