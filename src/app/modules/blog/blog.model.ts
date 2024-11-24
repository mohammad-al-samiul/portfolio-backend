import mongoose, { Schema, Document, Model } from "mongoose";
import { IBlogPost, IComment } from "./blog.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

interface IBlogPostDocument extends Document, IBlogPost {}

const commentSchema = new Schema<IComment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Disable automatic `_id` for subdocuments
);

const blogPostSchema = new Schema<IBlogPostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    categories: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to check if a blog post with the same title exists before saving
blogPostSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Ensure this runs only for new documents
    const isBlogPostExist = await BlogPost.findOne({ title: this.title });
    if (isBlogPostExist) {
      return next(
        new AppError(
          httpStatus.CONFLICT,
          "A blog post with this title already exists!"
        )
      );
    }
  }
  next();
});

// Middleware to ensure a blog post exists before updating
blogPostSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isBlogPostExist = await BlogPost.findOne(query);
  if (!isBlogPostExist) {
    return next(new AppError(httpStatus.NOT_FOUND, "Blog post not found!"));
  }
  next();
});

// Middleware to ensure a blog post exists before deleting
blogPostSchema.pre("findOneAndDelete", async function (next) {
  const query = this.getQuery();
  const isBlogPostExist = await BlogPost.findOne(query);
  if (!isBlogPostExist) {
    return next(new AppError(httpStatus.NOT_FOUND, "Blog post not found!"));
  }
  next();
});

export const BlogPost: Model<IBlogPostDocument> =
  mongoose.model<IBlogPostDocument>("BlogPost", blogPostSchema);
