//import { z } from "zod";
const z = require("zod");
export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "Task title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(5, { message: "Task title must be 5 or more characters long" }),
  description: z
    .string({
      required_error: "Task description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(5, { message: "Task title must be 5 or more characters long" }),
  date: z.string().datetime().optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string",
    })
    .min(5, { message: "Task title must be 5 or more characters long" })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .min(5, { message: "Task title must be 5 or more characters long" })
    .optional(),
  date: z.string().datetime().optional(),
});
