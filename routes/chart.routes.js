import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getDataInfoCards } from "../controllers/chart.controller.js";

const router = Router();

router.get("/infocards", authRequired, getDataInfoCards);

export default router;
