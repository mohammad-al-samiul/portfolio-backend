import express from "express";
import { UserControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./auth.constant";
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

router.get("/users", auth(USER_ROLE.admin), UserControllers.getAllUser);

export const userRoutes = router;
