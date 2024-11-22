import { multerUpload } from "../../config/multer.config";
import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";
import { USER_ROLE } from "../auth/auth.constant";
import auth from "../../middleware/auth";
import { BlogPostController } from "./blog.controller";

const blogRouter = express.Router();

// Route to create a blog post
blogRouter.post(
  "/",
  multerUpload.single("image"), // Image upload
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data); // Parse the data if it's sent as a JSON string
    next();
  },
  validateRequest(blogValidation.createBlogValidationSchema), // Validate the request body
  auth(USER_ROLE.admin), // Only allow admin users to create blog posts
  BlogPostController.createBlogPost
);

// Route to get all blog posts
blogRouter.get("/", BlogPostController.getAllBlogPosts);

// Route to get a single blog post by ID
blogRouter.get("/:id", BlogPostController.getOneBlogPost);

// Route to update a blog post by ID
blogRouter.put(
  "/:id",
  validateRequest(blogValidation.updateBlogValidationSchema), // Validate the request body
  auth(USER_ROLE.admin), // Only allow admin users to update blog posts
  BlogPostController.updateBlogPost
);

// Route to delete a blog post by ID
blogRouter.delete(
  "/:id",
  auth(USER_ROLE.admin), // Only allow admin users to delete blog posts
  BlogPostController.deleteBlogPost
);

export const blogRoutes = {
  blogRouter,
};
