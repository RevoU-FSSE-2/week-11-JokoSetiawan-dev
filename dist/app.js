"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const sellout_route_1 = __importDefault(require("./routes/sellout.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const routes = express_1.default.Router();
const app = (0, express_1.default)();
const port = process.env.PORT;
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(routes);
routes.use('/auth', auth_route_1.default);
routes.use('/user', auth_middleware_1.default, user_route_1.default);
routes.use('/sellout', sellout_route_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
