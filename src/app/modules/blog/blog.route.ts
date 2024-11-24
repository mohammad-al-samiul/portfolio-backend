import express from "express";
import { BlogPostController } from "./blog.controller";

import { blogPostValidation } from "./blog.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const router = express.Router();

router.post(
  "/",
  validateRequest(blogPostValidation.createBlogPostValidation),
  auth(USER_ROLE.admin),
  BlogPostController.createBlogPost
);

router.get("/", BlogPostController.getAllBlogPosts);

router.get("/:id", BlogPostController.getBlogPostById);

router.patch(
  "/:id",
  validateRequest(blogPostValidation.updateBlogPostValidation),
  auth(USER_ROLE.admin),
  BlogPostController.updateBlogPost
);

router.delete("/:id", auth(USER_ROLE.admin), BlogPostController.deleteBlogPost);

export const BlogPostRoutes = router;
