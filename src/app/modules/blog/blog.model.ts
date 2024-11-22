import mongoose, { Schema } from "mongoose";
import { IBlogPost } from "./blog.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    socialLinks: {
      twitter: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
    },
  },
  { _id: false } // Avoid creating an _id for the subdocument
);

const commentSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { _id: false } // Avoid creating an _id for the subdocument
);

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: authorSchema,
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    content: [
      {
        type: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
        src: {
          type: String,
        },
        alt: {
          type: String,
        },
      },
    ],
    tags: {
      type: [String],
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Middleware to check if a blog post with the same title exists before saving
blogPostSchema.pre("save", async function (next) {
  const isBlogPostExist = await BlogPost.findOne({ title: this.title });
  if (isBlogPostExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A blog post with this title already exists!"
    );
  }
  next();
});

// Middleware to ensure a blog post exists before updating
blogPostSchema.pre("findOneAndUpdate", async function (next) {
  const query = this?.getQuery();
  const isBlogPostExist = await BlogPost.findOne(query);
  if (!isBlogPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog post not found!");
  }
  next();
});

// Middleware to ensure a blog post exists before deleting
blogPostSchema.pre("findOneAndDelete", async function (next) {
  const query = this?.getQuery();
  const isBlogPostExist = await BlogPost.findOne(query);
  if (!isBlogPostExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog post not found!");
  }
  next();
});

export const BlogPost = mongoose.model<IBlogPost>("BlogPost", blogPostSchema);
