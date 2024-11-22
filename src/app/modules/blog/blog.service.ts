/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBlogPost } from "./blog.interface";
import { BlogPost } from "./blog.model";

// Service to create a new blog post
const createBlogPostIntoDB = async (image: any, payload: IBlogPost) => {
  const image_url = image?.path; // Get image URL if provided

  // If contentImage exists, use the uploaded image URL
  if (image_url) {
    payload.contentImage = image_url;
  }

  // Process content to handle image URLs if any content type is "image"

  // Create a new blog post in the database
  const result = await BlogPost.create(payload);
  return result;
};

// Service to get all blog posts
const getAllBlogPostsFromDB = async () => {
  const result = await BlogPost.find().select("-__v"); // Exclude the __v field
  return result;
};

// Service to get a single blog post by its ID
const getOneBlogPostFromDB = async (id: string) => {
  const result = await BlogPost.findOne({ _id: id }).select("-__v"); // Exclude the __v field
  return result;
};

// Service to update a blog post
const updateBlogPostFromDB = async (
  payload: Partial<IBlogPost>,
  id: string
) => {
  const result = await BlogPost.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated document
  }).select("-createdAt -updatedAt -__v"); // Exclude timestamps and __v
  return result;
};

// Service to delete a blog post
const deleteBlogPostFromDB = async (id: string) => {
  const result = await BlogPost.findOneAndDelete(
    { _id: id },
    { lean: true } // Return a plain JavaScript object instead of a Mongoose document
  ).select("-createdAt -updatedAt -__v"); // Exclude timestamps and __v
  return result;
};

export const BlogPostServices = {
  createBlogPostIntoDB,
  getAllBlogPostsFromDB,
  getOneBlogPostFromDB,
  updateBlogPostFromDB,
  deleteBlogPostFromDB,
};
