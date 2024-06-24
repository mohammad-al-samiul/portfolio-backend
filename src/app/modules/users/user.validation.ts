import { z } from "zod";
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required" }),
  }),
  password: z.string().nonempty({ message: "Password is required" }),
  phone: z.number().optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "user"]),
});

export const UserValidation = {
  createUserValidationSchema,
};
