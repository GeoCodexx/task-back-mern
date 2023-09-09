import { Router } from "express";
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import { validateSchema } from "../middlewares/validatorData.js";
import { createRoleSchema, updateRoleSchema } from "../schemas/role.schema.js";
import { authRequired } from "../middlewares/validateToken.js";

//Uso del metodo Router de Express para establecer las rutas
const router = Router();

router.get("/list", authRequired, getRoles);
router.get("/detail/:id", authRequired, getRole);
router.post(
  "/create",
  authRequired,
  validateSchema(createRoleSchema),
  createRole
);
router.put(
  "/update/:id",
  authRequired,
  validateSchema(updateRoleSchema),
  updateRole
);
router.delete("/delete/:id", authRequired, deleteRole);

export default router;
