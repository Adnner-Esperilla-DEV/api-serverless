require("dotenv").config();
const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const serverless = require("serverless-http");
const planetRoutes = require("./src/routes/planets.routes");
const userRoutes = require("./src/routes/users.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();
const client = new DynamoDBClient();

const docClient = DynamoDBDocumentClient.from(client);

app.use(cors());
app.use(express.json());
app.get("/test", async (req, res) => {
  try {
    const data = await docClient.send(new ListTablesCommand({}));
    res.json({
      message: "Conexión exitosa",
      tables: data.TableNames,
    });
  } catch (error) {
    console.error("Error conectando a DynamoDB:", error);
    res.status(500).json({ error: "No se pudo conectar a DynamoDB" });
  }
});
app.use("/planets", planetRoutes);
app.use("/users", userRoutes);

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
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
  apis: ["./src/routes/planets.routes.js", "./src/routes/users.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
