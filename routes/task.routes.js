import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validatorData.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/list", authRequired, getAllTasks);
router.get("/listbyuser", authRequired, getTasks);
router.get("/detail/:id", authRequired, getTask);
router.post(
  "/create",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);
router.put(
  "/update/:id",
  authRequired,
  validateSchema(updateTaskSchema),
  updateTask
);
router.delete("/delete/:id", authRequired, deleteTask);

export default router;
