import { z } from "zod";
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email format" }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Passowrd must be a string",
    }),
    phone: z.number().optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(["admin", "user"]).default("user"),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid Email format!" }),
    password: z.string({
      required_error: "Password is required!",
      invalid_type_error: "Password must be string",
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required!",
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }).optional(),
    phone: z.number({ required_error: "Phone is required!" }).optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  updateUserValidationSchema,
};
