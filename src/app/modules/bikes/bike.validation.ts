import { z } from "zod";

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),

    pricePerHour: z.number({
      required_error: "Price is required",
    }),

    isAvailable: z
      .boolean({
        required_error: "Available Price is required",
      })
      .optional(),

    cc: z.number({
      required_error: "CC is required",
    }),

    year: z.number({
      required_error: "Year is required",
    }),

    model: z.string({
      required_error: "Model is required",
    }),

    brand: z.string({
      required_error: "Brand is required",
    }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .optional(),

    description: z
      .string({
        required_error: "Description is required",
      })
      .optional(),

    pricePerHour: z
      .number({
        required_error: "Price is required",
      })
      .optional(),

    isAvailable: z
      .boolean({
        required_error: "Available Price is required",
      })
      .optional(),

    cc: z
      .number({
        required_error: "CC is required",
      })
      .optional(),

    year: z
      .number({
        required_error: "Year is required",
      })
      .optional(),

    model: z
      .string({
        required_error: "Model is required",
      })
      .optional(),

    brand: z
      .string({
        required_error: "Brand is required",
      })
      .optional(),
  }),
});

export const bikeValidation = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
