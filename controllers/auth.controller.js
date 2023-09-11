import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET, URL_AVATAR } from "../config.js";
import jwt from "jsonwebtoken";

//Registrar Usuario
export const register = async (req, res) => {
  //Destructurando las propiedades del body
  const { names, patlastname, matlastname, email, password } = req.body;
  try {
    //Comprobar si usuario existe con el email
    const verifyEmail = await User.findOne({ email });

    if (verifyEmail)
      return res
        .status(400)
        .json([
          "Correo electrónico ingresado ya se encuentra registrado. Por favor verifique sus datos.",
        ]);

    //Encriptacion de la contraseña
    const passHashed = await bcrypt.hash(password, 10);

    //Generamos un avatar al azar para el usuario a registrar
    const idAvatar = Math.floor(Math.random() * 99); //el metodo Math.floor() redondea decial a entero

    //Se crea un nuevo objeto con el modelo User
    const newUser = new User({
      names,
      patlastname,
      matlastname,
      email,
      password: passHashed,
      image: `${URL_AVATAR}/${idAvatar}.jpg`,
      role: "64dcefc50257526bd4a8b3e3", //Customer ID
      //role: "64da75bc4a41a7b4372e19e4", Admin ID
    });

    //guardar en la base de datos, al ser una promesa se gestiono con async/await
    await newUser.save();

    //responder al cliente
    res.send("Registered User successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  //Destructurando las propiedades del body
  const { email, password } = req.body;
  try {
    //Buscar usuario por email si existe
    const userFound = await User.findOne({ email }).populate({
      path: "role",
      populate: { path: "permissions" },
    });
    //El mensaje se envia como un array para que concuerde con los mensajes que emite el middleware validador de Schemas "zod"
    if (!userFound)
      return res.status(400).json(["Usuario y/o contraseña son incorrectos."]);

    //Si existe usuario se procede a comparar el password para autenticar
    const passMatch = await bcrypt.compare(password, userFound.password);
    if (!passMatch)
      //El mensaje se envia como un array para que concuerde con los mensajes que emite el middleware validador de Schemas "zod"
      return res.status(400).json(["Usuario y/o contraseña son incorrectos."]);

    //Si es correcto los credenciales se procede a generar el token
    const token = await createAccessToken({ id: userFound._id });

    //Responder con un token dentro de una cookie
    res.cookie("token", token, {
      //withCredentials: true,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    //Responder un objeto JSON con datos del usuario logeado para manejar su sesion
    res.json({
      message: "User signed in successfully",
      success: true,
      user: {
        id: userFound._id,
        names: userFound.names,
        patlastname: userFound.patlastname,
        matlastname: userFound.patlastname,
        email: userFound.patlastname,
        image: userFound.image,
        role: userFound.role,
      },
      token,
    });
    //res.send("ok")
    /*.json({
      id: userFound._id,
      names: userFound.names,
      patlastname: userFound.patlastname,
      image: userFound.image,
      roles: userFound.roles,
    });*/
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

/*Verificar token cuando el usuasrio no cerro sesión y recarga la pagina, para restaurar datos del usuario.
1.Si existe token en el localstorage, hacer una peticion a la ruta "/verifyState" para verificar el token si es valido.
2.Si es valido, se extrae el userID, se busca al usuario por su ID y se responde con un nuevo token en el cookie y datos del usuario al frontend.
*/

export const verifyTokenClient = (req, res) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .json({ message: "No token, authorization denied.", status: false });

  const jwtString = token.split(" ")[1];
  //console.log("Token cadena con split: ", jwtString);

  jwt.verify(jwtString, TOKEN_SECRET, async (err, user) => {
    //En caso de que el token no coincida con el SECRET KEY se retorna un mensaje de token invalido
    if (err)
      return res.status(403).json({ message: "Invalid token", status: false });

    const userFound = await User.findById(user.id).populate({
      path: "role",
      populate: { path: "permissions" },
    });

    if (!userFound) return res.sendStatus(401);

    //Si es correcto los credenciales se procede a generar el token
    const newToken = await createAccessToken({ id: userFound._id });

    //Responder con un token dentro de una cookie
    res.cookie("token", newToken, {
      //withCredentials: true,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    //Responder un objeto JSON con datos del usuario logeado para manejar su sesion
    res.json({
      token: newToken,
      success: true,
      user: {
        id: userFound._id,
        names: userFound.names,
        patlastname: userFound.patlastname,
        matlastname: userFound.patlastname,
        email: userFound.patlastname,
        image: userFound.image,
        role: userFound.role,
      },
    });
  });
};
