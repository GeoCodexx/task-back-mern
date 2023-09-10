import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import Role from "../models/role.model.js";
import Permission from "../models/permission.model.js";

export const getDataInfoCards = async (req, res) => {
  try {
    const users = await User.count();
    const tasks = await Task.count();
    const roles = await Role.count();
    const permissions = await Permission.count();
    console.log({
      users,
      tasks,
      roles,
      permissions,
    });
    res.json({
      users,
      tasks,
      roles,
      permissions,
    });
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};
