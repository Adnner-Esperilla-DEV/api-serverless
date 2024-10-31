const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://sluyylvtvh.execute-api.us-east-1.amazonaws.com",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
};
const options = {
  swaggerOptions,
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
// const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = {
    swaggerSpec
};
