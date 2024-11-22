import express from "express";
import { userRoutes } from "../modules/auth/auth.route";
import { projectRoutes } from "../modules/project/project.route";

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
  {
    path: "/projects",
    route: projectRoutes.projectRouter,
  },
  // {
  //   path: "/rentals",
  //   route: rentalRoutes.rentalRouter,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
