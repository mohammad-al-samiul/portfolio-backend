import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { BlogPostService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const blogData = req.body;
  const result = await BlogPostService.createBlogPost(_id, blogData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog post created successfully",
    data: result,
  });
});

const getAllBlogPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogPostService.getAllBlogPosts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog posts retrieved successfully",
    data: result,
  });
});

const getBlogPostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BlogPostService.getBlogPostById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog post retrieved successfully",
    data: result,
  });
});

const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await BlogPostService.updateBlogPost(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog post updated successfully",
    data: result,
  });
});

const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BlogPostService.deleteBlogPost(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog post deleted successfully",
    data: result,
  });
});

export const BlogPostController = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
