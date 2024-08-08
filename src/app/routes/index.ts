import express from "express";
import { userRoutes } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes.authRouter,
  },
  {
    path: "/users",
    route: userRoutes.userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
