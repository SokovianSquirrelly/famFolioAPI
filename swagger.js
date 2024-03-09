const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "famFolio Docs",
    description: "API documentation for CSE341",
  },
  host: "localhost:8080",
  schemes: ["http"], // Using "http" for local development
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
