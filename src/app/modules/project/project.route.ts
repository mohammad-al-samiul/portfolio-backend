import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";

import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";
import { projectValidation } from "./project.validation";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";

const projectRouter = express.Router();

projectRouter.post(
  "/",
  multerUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(projectValidation.createProjectValidationSchema),
  auth(USER_ROLE.admin),
  ProjectController.createProject
);

projectRouter.get("/", ProjectController.getAllProjects);

projectRouter.put(
  "/:id",
  validateRequest(projectValidation.updateProjectValidationSchema),
  auth(USER_ROLE.admin),
  ProjectController.updateProject
);

projectRouter.delete(
  "/:id",
  auth(USER_ROLE.admin),
  ProjectController.deleteProject
);

export const projectRoutes = {
  projectRouter,
};
