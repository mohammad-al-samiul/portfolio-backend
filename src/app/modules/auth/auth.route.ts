import express from "express";
import { UserControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser
);

router.post(
  "/login",
  validateRequest(UserValidation.loginUserValidationSchema),
  UserControllers.loginUser
);

export const userRoutes = router;
