import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const authRequired = (req, res, next) => {
  //Destructurando el token de las cookies.
  //console.log(req.cookies);
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "No token, authorization denied.", status: false });

  //Verificacion del token
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    //En caso de que el token no coincida con el SECRET KEY se retorna un mensaje de token invalido
    if (err)
      return res.status(403).json({ message: "Invalid token", status: false });

    //En caso de que el token sea autentico, se procede a guardar el payload ({id , iat, exp}) en req.user.
    req.user = user; //Se crea la propiedad en el req.user y se asigna los datos del payload, para que la siguiente funcion pueda disponer del id del usuario.

    //Pasar a la siguiente funcion
    next();
  });
};
