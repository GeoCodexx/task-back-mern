import app from "./app.js";
import { connectDb } from "./db.js";

//Conexion a la base de datos
connectDb();

//Montando el servidor
app.listen(process.env.PORT || process.env.SERVER_PORT , () => {
  console.log("Server run on port 3000");
});
