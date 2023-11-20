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

const app = express();
const ip = '0.0.0.0'
const port = 10000;
const routes = express.Router();


db.connect(function (err) {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log("DB Connected!");
});

const apiSpecPath = "./doc/openapi.yaml"; 
interface SwaggerDocument {
  [key: string]: any;
}

const swaggerDocument =
  (yaml.load(fs.readFileSync(apiSpecPath, "utf8")) as SwaggerDocument) || {};
app.use("/apidoc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const openApiValidator = new OpenApiValidator({
  apiSpec: apiSpecPath,
  validateRequests: true,
  validateResponses: true,
});

app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

routes.use("/auth", authRoutes);
routes.use("/user", authenticationMiddleware, userRoutes);
routes.use("/sellout", authenticationMiddleware, selloutRoutes);

app.use(errorHandlerMiddleware);

// app.listen(port, ip, () => {
//   console.log(`Server running on http://${ip}:${port}/`);
// });
