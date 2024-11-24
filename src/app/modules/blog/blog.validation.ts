import { z } from "zod";

export const createBlogPostValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string().optional(),
    content: z.string({
      required_error: "Content is required",
    }),
    publishedDate: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    comments: z
      .array(
        z.object({
          author: z.string({
            required_error: "Comment author ID is required",
          }),
          comment: z.string({
            required_error: "Comment text is required",
          }),
          date: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const updateBlogPostValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    publishedDate: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    comments: z
      .array(
        z.object({
          author: z.string(),
          comment: z.string(),
          date: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const blogPostValidation = {
  createBlogPostValidation,
  updateBlogPostValidation,
};
