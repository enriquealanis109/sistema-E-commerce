import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Sistema E-commerce",
    description: "Documentacion de la API de la tienda",
  },
  host: "localhost:3000",
  schemes: ["http"],
};
const outputFile = "./config/swagger_output.json";
const routes = ["./src/app.ts"];

swaggerAutogen()(outputFile, routes, doc);
