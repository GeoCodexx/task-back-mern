import { URL_AVATAR } from "../config.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//Registrar Usuario
export const createUser = async (req, res) => {
  //Destructurando las propiedades del body
  const { names, patlastname, matlastname, email, password, role } = req.body;
  try {
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
      image: `${URL_AVATAR}/${idAvatar}.jpg`, //El campo imagen no se solicita al registrar un usuario
      role,
    });

    //guardar en la base de datos, al ser una promesa se gestiono con async/await
    await newUser.save();

    //responder al cliente
    res.send("User successfully registered");
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Listar Usuario
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.json(users);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Obtener Usuario
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Editar Usuario
export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const pwdHashed = await bcrypt.hash(req.body.password, 10);
      const dataUser = req.body;
      dataUser.password = pwdHashed;
      const userFound = await User.findByIdAndUpdate(req.params.id, dataUser, {
        new: true,
      });
      if (!userFound)
        return res.status(400).json({ message: "User not found" });
      res.json({
        names: userFound.names,
        patlastname: userFound.patlastname,
        matlastname: userFound.matlastname,
        email: userFound.email,
        role: userFound.role,
      });
    } else {
      const userFound = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!userFound) return res.status(400).json({ message: "User not found" });
      res.json({
        names: userFound.names,
        patlastname: userFound.patlastname,
        matlastname: userFound.matlastname,
        email: userFound.email,
        role: userFound.role,
      });
    }
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Eliminar Usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.sendStatus(204);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Verificar password de Usuario
export const verifyPassword = async (req, res) => {
  //Destructurando las propiedades del body
  const { password } = req.body;
  try {
    //Buscar usuario por email si existe
    const userFound = await User.findOne({ _id: req.params.id });

    if (!userFound) return res.status(400).json(["*Usuario no existe"]);

    //Si existe usuario se procede a comparar el password para autenticar
    const passMatch = await bcrypt.compare(password, userFound.password);
    if (!passMatch)
      //El mensaje se envia como un array para que concuerde con los mensajes que emite el middleware validador de Schemas "zod"
      return res.status(400).json(["*Contraseña actual incorrecta"]);
    //Responder un objeto JSON con datos del usuario logeado para manejar su sesion
    res.json({
      success: true,
    });
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};
