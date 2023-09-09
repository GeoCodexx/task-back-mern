import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  verifyPassword,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorData.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

//Uso del metodo Router de Express para establecer las rutas
const router = Router();

router.get("/list", authRequired, getUsers);
router.get("/detail/:id", authRequired, getUser);
router.post(
  "/create",
  authRequired,
  validateSchema(createUserSchema),
  createUser
);
router.put(
  "/update/:id",
  authRequired,
  validateSchema(updateUserSchema),
  updateUser
);
router.delete("/delete/:id", authRequired, deleteUser);
router.post("/verifypwd/:id", authRequired, verifyPassword);

export default router;
