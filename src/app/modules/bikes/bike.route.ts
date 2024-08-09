import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { bikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const bikeRouter = express.Router();

bikeRouter.post(
  "/",
  validateRequest(bikeValidation.createBikeValidationSchema),
  auth(USER_ROLE.admin),
  BikeController.createBike
);

bikeRouter.get("/", BikeController.getAllBike);

bikeRouter.put(
  "/:id",
  validateRequest(bikeValidation.updateBikeValidationSchema),
  auth(USER_ROLE.admin),
  BikeController.updateBike
);

bikeRouter.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike);

export const bikeRoutes = {
  bikeRouter,
};
