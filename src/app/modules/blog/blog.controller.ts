import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BlogPostServices } from "./blog.service";

/**
 * Controller to create a new blog post.
 */
const createBlogPost = catchAsync(async (req, res) => {
  const blogPostInfo = req.body;

  const result = await BlogPostServices.createBlogPostIntoDB(
    req.file, // If there is an image file
    blogPostInfo
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog post created successfully",
    data: result,
  });
});

/**
 * Controller to retrieve all blog posts.
 */
const getAllBlogPosts = catchAsync(async (req, res) => {
  const result = await BlogPostServices.getAllBlogPostsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog posts retrieved successfully",
    data: result,
  });
});

/**
 * Controller to retrieve a single blog post by ID.
 */
const getOneBlogPost = catchAsync(async (req, res) => {
  const result = await BlogPostServices.getOneBlogPostFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog post retrieved successfully",
    data: result,
  });
});

/**
 * Controller to update a blog post by ID.
 */
const updateBlogPost = catchAsync(async (req, res) => {
  const updateDoc = req.body;
  const id = req.params.id;

  const result = await BlogPostServices.updateBlogPostFromDB(updateDoc, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog post updated successfully",
    data: result,
  });
});

/**
 * Controller to delete a blog post by ID.
 */
const deleteBlogPost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogPostServices.deleteBlogPostFromDB(id);

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
  getOneBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
