import Role from "../models/role.model.js";

//Listar
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.json(roles);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Obtener por ID
export const getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Crear
export const createRole = async (req, res) => {
  const { name, description, permissions } = req.body;
  try {
    const newRole = new Role({
      name,
      description,
      permissions,
    });
    const savedRole = await newRole.save();
    res.json(savedRole);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Actualizar
export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Eliminar
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.sendStatus(204);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};
