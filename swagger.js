const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "famFolio Docs",
    description: "API documentation for CSE341",
  },
  host: "https://famfolioapi.onrender.com",
  schemes: ["https"], // Using "http" for local development
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
