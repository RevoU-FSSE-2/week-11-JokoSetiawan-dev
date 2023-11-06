import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { db } from "./config/db.connection";
import userRoutes from "./routes/user.route";
import selloutRoutes from "./routes/sellout.route";
import authRoutes from "./routes/auth.route";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "./middleware/auth.middleware";
import errorHandlerMiddleware from "./middleware/error.handling";
import swaggerUi from "swagger-ui-express";
import * as yaml from "js-yaml"; // Import js-yaml
import { OpenApiValidator } from "express-openapi-validator/dist/openapi.validator";
import fs from "fs";

const routes = express.Router();

const app = express();
const apiSpecPath = "./doc/openapi.yaml"; // Adjust the path to your OpenAPI spec

// Define a custom type for the Swagger document

const port = process.env.PORT;

db.connect(function (err) {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log("DB Connected!");
});
interface SwaggerDocument {
  [key: string]: any;
}

// Serve Swagger UI
const swaggerDocument =
  (yaml.load(fs.readFileSync(apiSpecPath, "utf8")) as SwaggerDocument) || {};
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create an OpenApiValidator instance and configure it
const openApiValidator = new OpenApiValidator({
  apiSpec: apiSpecPath,
  validateRequests: true, // Enable request validation
  validateResponses: true, // Enable response validation
});

app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

routes.use("/auth", authRoutes);
routes.use("/user", authenticationMiddleware, userRoutes);
routes.use("/sellout", authenticationMiddleware, selloutRoutes);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
