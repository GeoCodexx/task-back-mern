import express from "express";
import morgan from "morgan";
import cors from "cors";

//Rutas
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import roleRoutes from "./routes/role.routes.js";
import permissionRoutes from "./routes/permission.routes.js";
import taskRoutes from "./routes/task.routes.js";
import chartRoutes from "./routes/chart.routes.js";
import cookieParser from "cookie-parser";

//Instanciar express
const app = express();

//Función de middleware integrada en Express. Analiza las requests entrantes con cargas JSON, de lo contrario muestra undefined, no lo entiende
app.use(express.json());
//Función de middlewar para poder leer cookies
app.use(cookieParser());

//Usando libreria para ver el estado de cada solicitud al servidor
app.use(morgan("dev"));
//Para admitir el acceso del cliente a la API
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/charts", chartRoutes);

export default app;
