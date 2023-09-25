import { z } from "zod/lib/index.js"; //Libreria zod para validaciones de datos

export const createPermissionSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name must be 3 or more characters long" }),
  reference: z
    .string({
      required_error: "reference is required",
      invalid_type_error: "reference must be a string",
    })
    .min(3, { message: "reference must be 3 or more characters long" }),
});

export const updatePermissionSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name must be a string",
    })
    .min(3, { message: "Name must be 3 or more characters long" })
    .optional(),
  reference: z
    .string({
      invalid_type_error: "reference must be a string",
    })
    .min(3, { message: "reference must be 3 or more characters long" })
    .optional(),
});
