import { z } from "zod";
const createUserValidationSchema = z.object({
  body: z.object({
    userData: z.object({
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
      address: z.string().optional(),
      role: z.enum(["admin", "user"]).default("user"),
    }),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    userData: z.object({
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid Email format!" }),
      password: z.string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be string",
      }),
    }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
