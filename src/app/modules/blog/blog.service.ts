import { BlogPost } from "./blog.model";
import { IBlogPost } from "./blog.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Types } from "mongoose";

const createBlogPost = async (userId: Types.ObjectId, payload: IBlogPost) => {
  payload.author = userId;

  const result = await BlogPost.create(payload);
  return result;
};

const getAllBlogPosts = async () => {
  const result = await BlogPost.find()
    .populate("author", "name email bio image")
    .populate("comments.author", "name email");
  return result;
};

const getBlogPostById = async (id: string) => {
  const result = await BlogPost.findById(id)
    .populate("author", "name email")
    .populate("comments.author", "name email");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog post not found!");
  }
  return result;
};

const updateBlogPost = async (id: string, payload: Partial<IBlogPost>) => {
  const result = await BlogPost.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("author", "name email");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog post not found!");
  }
  return result;
};

const deleteBlogPost = async (id: string) => {
  const result = await BlogPost.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog post not found!");
  }
  return result;
};

export const BlogPostService = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
