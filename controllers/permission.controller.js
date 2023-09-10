import Permission from "../models/permission.model.js";

//Listar
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Obtener por ID
export const getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    res.json(permission);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Crear
export const createPermission = async (req, res) => {
  const { name, reference } = req.body;
  try {
    //Comprobar si permiso existe
    const verify = await Permission.findOne({ name, reference});

    if (verify)
      return res
        .status(400)
        .json([
          "El nombre y referencia de permiso ya se encuentra registrado. Por favor verifique sus datos.",
        ]);

    const newPermission = new Permission({
      name,
      reference,
    });
    const savedPermission = await newPermission.save();
    res.json(savedPermission);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Actualizar
export const updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    res.json(permission);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Eliminar
export const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    res.sendStatus(204);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};
