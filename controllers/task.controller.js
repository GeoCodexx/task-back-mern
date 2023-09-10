import Task from "../models/task.model.js";

//Listar todas las tareas (para el Panel de administracion)
export const getAllTasks = async (req, res) => {
  try {
    //Obtener tarea con la propiedad user poblado con sus datos referenciales y no solo el id
    const tasks = await Task.find().populate("user");
    //console.log(tasks)
    res.json(tasks);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Listar tareas por Usuario
export const getTasks = async (req, res) => {
  try {
    //Obtener tarea con la propiedad user poblado con sus datos referenciales y no solo el id
    const tasks = await Task.find({ user: req.user.id }).populate("user"); //el req.user.id lo pasa el middleware validatorToken.
    res.json(tasks);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Obtener por ID
export const getTask = async (req, res) => {
  try {
    //Obtener tarea con la propiedad user poblado con sus datos referenciales y no solo el id
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Crear
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Actualizar
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};

//Eliminar
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
  } catch (error) {
    //Respuesta en caso exista algun error al procesar la consulta
    res.status(500).json({ message: error.message });
  }
};
