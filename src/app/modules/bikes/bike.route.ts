import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { bikeValidation } from "./bike.validation";
import { bikeController } from "./bike.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const bikeRouter = express.Router();

bikeRouter.post(
  "/",
  validateRequest(bikeValidation.bikeValidationSchema),
  auth(USER_ROLE.admin),
  bikeController.createBike
);

export const bikeRoutes = {
  bikeRouter,
};
