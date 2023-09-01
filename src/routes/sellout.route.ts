import express from "express";
const selloutRoutes = express.Router();
import selloutController from "../controller/sellout.controller";

selloutRoutes.get("/", selloutController.findAllSellout);
selloutRoutes.get("/:id", selloutController.findSelloutId);
selloutRoutes.post("/", selloutController.inputSellout);
selloutRoutes.put("/:id", selloutController.updateSelloutData);
selloutRoutes.delete("/:id", selloutController.deleteSellout);

export default selloutRoutes;
