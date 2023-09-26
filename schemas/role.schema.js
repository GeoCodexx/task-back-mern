const z = require("zod");
//import { z } from "zod";

export const createRoleSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "name must be a string",
    })
    .min(5, { message: "Name must be 5 or more characters long" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(5, { message: "Description must be 5 or more characters long" }),
  permissions: z
    .string({
      required_error: "Permissions is required",
    })
    .array()
    .nonempty({ message: "Permissions must contain one or more elements" }),
});

export const updateRoleSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(5, { message: "Name must be 5 or more characters long" })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .min(5, { message: "Description must be 5 or more characters long" })
    .optional(),
  permissions: z
    .string()
    .array()
    .nonempty({ message: "Permissions must contain one or more elements" })
    .optional(),
});
