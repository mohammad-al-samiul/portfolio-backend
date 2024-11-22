import { z } from "zod";

const createProjectValidationSchema = z.object({
  body: z.object({
    projectNo: z.string({
      required_error: "ID is required",
    }),
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    techStack: z
      .array(
        z.string({
          required_error: "Each technology in the stack must be a string",
        })
      )
      .nonempty({
        message: "Tech stack must contain at least one technology",
      }),
    github: z.string({
      required_error: "GitHub URL is required",
    }),
    live: z.string({
      required_error: "Live URL is required",
    }),
  }),
});

const updateProjectValidationSchema = z.object({
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
    description: z
      .string({
        required_error: "Description is required",
      })
      .optional(),
    techStack: z
      .array(
        z.string({
          required_error: "Each technology in the stack must be a string",
        })
      )
      .optional(),
    github: z
      .string({
        required_error: "GitHub URL is required",
      })
      .optional(),
    live: z
      .string({
        required_error: "Live URL is required",
      })
      .optional(),
  }),
});

export const projectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
