export const validateSchema = (schema) => (req, res, next) => {
  try {
    //Comprobar si el objeto JSON enviado está vacío
    if (Object.keys(req.body).length === 0)
      return res
        .status(400)
        .json({ error: "Message: empty JSON object, include at least one element" });
    
    //Si el objeto contiene datos entonces se procede a validar
    schema.parse(req.body);
    //Pasar a la siguiente funcion
    next();
  } catch (error) {
    //Si en caso existe error se reporta el mensaje de error:
    return res
      .status(400)
      .json({ error: error.errors.map((err) => err.message) });
  }
};
