import { Router } from "express";
import {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "../controllers/permission.controller.js";
import { validateSchema } from "../middlewares/validatorData.js";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "../schemas/permission.schema.js";
import { authRequired } from "../middlewares/validateToken.js";

//Uso del metodo Router de Express para establecer las rutas
const router = Router();

router.get("/list", authRequired, getPermissions);
router.get("/detail/:id", authRequired, getPermission);
router.post(
  "/create",
  authRequired,
  validateSchema(createPermissionSchema),
  createPermission
);
router.put(
  "/update/:id",
  authRequired,
  validateSchema(updatePermissionSchema),
  updatePermission
);
router.delete("/delete/:id", authRequired, deletePermission);

export default router;
