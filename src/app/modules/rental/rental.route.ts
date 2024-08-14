import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { RentalValidation } from "./rental.validation";
import { RentalControllers } from "./rental.controller";

const rentalRouter = express.Router();

rentalRouter.post(
  "/",
  validateRequest(RentalValidation.rentalValidationSchema),
  RentalControllers.createRental
);

export const rentalRoutes = { rentalRouter };
