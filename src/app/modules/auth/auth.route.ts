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

router.post(
  "/refresh-token",
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken
);

router.get("/users", auth(USER_ROLE.admin), UserControllers.getAllUser);

router.get("/me", UserControllers.getProfile);

export const userRoutes = router;
