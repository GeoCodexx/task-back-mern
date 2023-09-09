import { Router } from "express";
import {
  register,
  login,
  logout,
  //profile,
  verifyTokenClient,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

//Importacion de middleware para validar datos del Schema
import { validateSchema } from "../middlewares/validatorData.js";

//Importacion de los esquemas requeridos para cada validacion
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

//Uso del metodo Router de Express para establecer las rutas
const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);
//router.get("/profile", authRequired, profile);
router.get("/verify", verifyTokenClient);

export default router;
