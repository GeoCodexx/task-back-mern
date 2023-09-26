import { z } from "zod"; //Libreria zod para validaciones de datos

export const registerSchema = z.object({
  names: z
    .string({
      required_error: "Names is required",
      invalid_type_error: "Names must be a string",
    })
    .min(3, { message: "Names must be 3 or more characters long" }),

  patlastname: z
    .string({
      required_error: "Patern lastname is required",
      invalid_type_error: "Patern lastname must be a string",
    })
    .min(3, { message: "Patern lastname must be 3 or more characters long" }),

  matlastname: z
    .string({
      required_error: "Matern lastname is required",
      invalid_type_error: "Matern lastname must be a string",
    })
    .min(3, { message: "Matern lastname must be 3 or more characters long" }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, { message: "Password must be 5 or more characters long" }),

  image: z.string().url({ message: "Invalid url image" }).optional(),
  role: z.string({required_error: "Role is required",}).optional(),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, { message: "Password must be 5 or more characters long" }),
});
