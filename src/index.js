import app from "./app.js";
import { connectDb } from "./db.js";

//Conexion a la base de datos
connectDb();

//Montando el servidor
app.listen(3000, () => {
  console.log("Server run on port 3000");
});
