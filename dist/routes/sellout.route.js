"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const selloutRoutes = express_1.default.Router();
const sellout_controller_1 = __importDefault(require("../controller/sellout.controller"));
selloutRoutes.get("/", sellout_controller_1.default.findAllSellout);
selloutRoutes.get("/:id", sellout_controller_1.default.findSelloutId);
selloutRoutes.post("/", sellout_controller_1.default.inputSellout);
selloutRoutes.put("/:id", sellout_controller_1.default.updateSelloutData);
selloutRoutes.delete("/:id", sellout_controller_1.default.deleteSellout);
exports.default = selloutRoutes;
