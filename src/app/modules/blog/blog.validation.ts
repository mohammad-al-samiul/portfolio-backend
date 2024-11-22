import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.object({
      name: z.string({
        required_error: "Author name is required",
      }),
      profilePicture: z.string({
        required_error: "Profile picture URL is required",
      }),
      bio: z.string({
        required_error: "Bio is required",
      }),
      socialLinks: z.object({
        twitter: z.string({
          required_error: "Twitter URL is required",
        }),
        github: z.string({
          required_error: "GitHub URL is required",
        }),
      }),
    }),
    publishedDate: z.string({
      required_error: "Published date is required",
    }),
    categories: z.array(z.string()).nonempty({
      message: "At least one category is required",
    }),
    content: z
      .array(
        z.object({
          type: z.enum(["paragraph", "image", "quote"], {
            required_error: "Content type is required",
          }),
          text: z.string().optional(),
          src: z.string().optional(),
          alt: z.string().optional(),
        })
      )
      .nonempty({
        message: "Content cannot be empty",
      }),
    tags: z.array(z.string()).nonempty({
      message: "At least one tag is required",
    }),
    comments: z
      .array(
        z.object({
          id: z.number({
            required_error: "Comment ID is required",
          }),
          author: z.string({
            required_error: "Comment author is required",
          }),
          comment: z.string({
            required_error: "Comment text is required",
          }),
          date: z.string({
            required_error: "Comment date is required",
          }),
        })
      )
      .optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    id: z
      .string({
        required_error: "ID is required",
      })
      .optional(),
    title: z
      .string({
        required_error: "Title is required",
      })
      .optional(),
    author: z
      .object({
        name: z.string().optional(),
        profilePicture: z.string().optional(),
        bio: z.string().optional(),
        socialLinks: z
          .object({
            twitter: z.string().optional(),
            github: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    publishedDate: z.string().optional(),
    categories: z.array(z.string()).optional(),
    content: z
      .array(
        z.object({
          type: z.enum(["paragraph", "image", "quote"]).optional(),
          text: z.string().optional(),
          src: z.string().optional(),
          alt: z.string().optional(),
        })
      )
      .optional(),
    tags: z.array(z.string()).optional(),
    comments: z
      .array(
        z.object({
          id: z.number().optional(),
          author: z.string().optional(),
          comment: z.string().optional(),
          date: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
