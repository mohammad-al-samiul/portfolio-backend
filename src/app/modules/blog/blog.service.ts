/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBlogPost } from "./blog.interface";
import { BlogPost } from "./blog.model";

// Service to create a new blog post
const createBlogPostIntoDB = async (image: any, payload: IBlogPost) => {
  const image_url = image?.path;

  payload.content = payload.content.map((item) =>
    item.type === "image" && item.src ? { ...item, src: image_url } : item
  );

  const result = await BlogPost.create(payload);
  return result;
};

// Service to get all blog posts
const getAllBlogPostsFromDB = async () => {
  const result = await BlogPost.find().select("-__v");
  return result;
};

// Service to get a single blog post by its ID
const getOneBlogPostFromDB = async (id: string) => {
  const result = await BlogPost.findOne({ _id: id }).select("-__v");
  return result;
};

// Service to update a blog post
const updateBlogPostFromDB = async (
  payload: Partial<IBlogPost>,
  id: string
) => {
  const result = await BlogPost.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated document
  }).select("-createdAt -updatedAt -__v");
  return result;
};

// Service to delete a blog post
const deleteBlogPostFromDB = async (id: string) => {
  const result = await BlogPost.findOneAndDelete(
    { _id: id },
    { lean: true } // Return a plain JavaScript object instead of a Mongoose document
  ).select("-createdAt -updatedAt -__v");
  return result;
};

export const BlogPostServices = {
  createBlogPostIntoDB,
  getAllBlogPostsFromDB,
  getOneBlogPostFromDB,
  updateBlogPostFromDB,
  deleteBlogPostFromDB,
};
