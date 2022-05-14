const { size } = require("lodash");
const Conection = require("./conection");
const db = require("../../models/index");

class ModelUser extends Conection {
  // Esta funcion valida los datos del usuario para iniciar sesión
  async login({ email, password }) {
    await this.autenticate();

    const user = await db.sequelize.models.user;

    // Se obtiene la informacion del usuario con el correo y la contraseña
    let resp = false;
    const infouser = await user.findAll({
      where: {
        email,
        password
      }
    });

    // Si se obtuvo informacion el valor de resp sera de true en caso contrario sera de false
    if (size(infouser) > 0) {
      resp = true;
    } else {
      resp = false;
    }

    return resp;
  }

  // Esta funcion realiza el registro del usuario
  async register({ email, name, password }) {
    await this.autenticate();

    const user = await db.sequelize.models.user;
    let resp = { ok: false, msg: "Error al registrar el usuario" };

    // Primero se verifica si el correo no existe en el sistema, en caso de existir se devuelve un error indicandole al usuario que el correo ya existe
    const infouser = await user.findAll({
      where: {
        email
      }
    });

    // En caso de no encontrase informacion se relaiza el registro
    if (size(infouser) == 0) {
      resp = await user.create({
        name,
        email,
        password,
        role: 2
      });
      resp = { ok: true, msg: "Registro exitoso" };
    } else {
      resp = { ok: false, msg: "Email ya registrado" };
    }

    return resp;
  }

  // Esta funcion retorna la informacion de un usuario en especifico
  async getUser({ id }) {
    let resp = false;
    const user = await db.sequelize.models.user;

    const infouser = await user.findAll({
      attributes: ["id", "name", "email", "role"],
      where: {
        id
      }
    });

    if (size(infouser) > 0) {
      resp = infouser;
    } else {
      resp = false;
    }

    return resp;
  }

  //   async logout(){
  //       await this.close();
  //   }
}

module.exports = ModelUser;
