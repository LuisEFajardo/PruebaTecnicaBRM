const { size } = require("lodash");
const db = require("../../models");
const Conection = require("./conection");

class ModelCart extends Conection {
  async addCart({ idUser, listProduct, finalPrice }) {
    let resp = false;
    const cart = await db.sequelize.models.cart;

    try {
      await cart.create({
        idUser,
        listProduct,
        finalPrice,
        state: "Creada"
      });
      resp = true;
    } catch (err) {
      resp = false;
    }

    return resp;
  }

  async editCart({ id }) {
    let resp = false;
    const cart = await db.sequelize.models.cart;

    // Si la edición se hace exitosa el valor de resp es true, en caso contrario el valor sera false
    try {
      await cart.update(
        { state: "Finalizada" },
        {
          where: {
            id
          }
        }
      );
      resp = true;
    } catch (err) {
      resp = false;
    }

    return resp;
  }
}

module.exports = ModelCart;
