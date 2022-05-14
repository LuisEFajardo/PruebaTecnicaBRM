const { response } = require("express");
const ModelUser = require("../model/modelUser");
const modelUser = new ModelUser();

// Esta funcion valida los datos del usuario
// Se envia el correo y la contraseña a la funcion login del modelo para validar los datos
// Si resp es igual a false se presento un error y se envia un status 401
// Si resp es diferente de false se envia la información solicitada
const login = async (req, res = response) => {
  const { email, password } = req.body;
  let resp = false;

  resp = await modelUser.login({ email, password });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Email o contraseña invalido" });
  }

  return res.status(200).json({ ok: true, msg: "Inicio de sesión exitoso" });
};

// Este controlador realiza el registro del usuario
// Se recibe el email, password y name de los parametros
// Se envia la información a la funcion register del modelo para relaizar el registro
const register = async (req, res = response) => {
  const { email, password, name } = req.body;

  let resp = false;

  resp = await modelUser.register({name, email, password});

  if (!resp.ok) {
    return res
      .status(401)
      .json({ ok: false, msg: resp.msg });
  }

  return res.status(200).json({ ok: true, msg: "Registro exitoso" });
};

// Esta funcion retorna la información del usuario
const getUser = async(req, res = response) => {
  const {id} = req.body;

  let resp = false;

  resp = await modelUser.getUser({id});

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error consultando el usuario" });
  }

  return res.status(200).json({ ok: true, user:resp });
};

module.exports = {
  login,
  register,
  getUser
};
