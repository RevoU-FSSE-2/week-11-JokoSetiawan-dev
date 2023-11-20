"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const db_connection_1 = require("./config/db.connection");
const user_route_1 = __importDefault(require("./routes/user.route"));
const sellout_route_1 = __importDefault(require("./routes/sellout.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const error_handling_1 = __importDefault(require("./middleware/error.handling"));
const app = (0, express_1.default)();
const ip = '0.0.0.0';
const port = 10000;
const routes = express_1.default.Router();
db_connection_1.db.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("DB Connected!");
});
// const apiSpecPath = "./doc/openapi.yaml"; 
// interface SwaggerDocument {
//   [key: string]: any;
// }
// const swaggerDocument =
//   (yaml.load(fs.readFileSync(apiSpecPath, "utf8")) as SwaggerDocument) || {};
// app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const openApiValidator = new OpenApiValidator({
//   apiSpec: apiSpecPath,
//   validateRequests: true,
//   validateResponses: true,
// });
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(routes);
routes.use("/auth", auth_route_1.default);
routes.use("/user", auth_middleware_1.authenticationMiddleware, user_route_1.default);
routes.use("/sellout", auth_middleware_1.authenticationMiddleware, sellout_route_1.default);
app.use(error_handling_1.default);
// app.listen(port, ip, () => {
//   console.log(`Server running on http://${ip}:${port}/`);
// });
