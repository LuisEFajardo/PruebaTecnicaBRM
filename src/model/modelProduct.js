const { size } = require("lodash");
const db = require("../../models");
const Conection = require("./conection");

class ModelProduct extends Conection {

  // Esta funcion retorna los productos registrados en el sistema
  async getProducts() {
    let resp = false;
    
    const product = await db.sequelize.models.product;

    const infoProduct = await product.findAll({
      attributes: ["id", "name", "price", "numberLot"]
    });

    if (size(infoProduct) > 0) {
      resp = infoProduct;
    } else {
      resp = false;
    }

    return resp;
  }

  // Esta funcion retorna un producto en especifico
  async getProduct({ id }) {
    let resp = false;
    const product = await db.sequelize.models.product;

    const infoProduct = await product.findAll({
      attributes: ["id", "name", "price", "numberLot"],
      where: {
        id
      }
    });

    if (size(infoProduct) > 0) {
      resp = infoProduct;
    } else {
      resp = false;
    }

    return resp;
  }

  // Esta funcion agrega un producto
  async addProduct({ numberLot, name, price, quantity }) {
    let resp = false;
    const product = await db.sequelize.models.product;

    // Si la adición se hace exitosa el valor de resp es true, en caso contrario el valor sera false
    try {
      await product.create({
        numberLot,
        name,
        price,
        quantity
      });
      resp = true;
    } catch (err) {
      resp = false;
    }

    return resp;
  }

  // Esta funcion edita un producto por medio del id
  async editProduct({ id, price, quantity }) {
    let resp = false;
    const product = await db.sequelize.models.product;

    // Si la edición se hace exitosa el valor de resp es true, en caso contrario el valor sera false
    try {
      await product.update(
        { price, quantity },
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

  // Esta funcion elimina un producto por medio del id
  async deleteProduct({ id }) {
    let resp = false;
    const product = await db.sequelize.models.product;

    // Si la eliminacion se hace exitosa el valor de resp es true, en caso contrario el valor sera false
    try {
      await product.destroy({
        where: {
          id
        }
      });
      resp = true;
    } catch (err) {
      resp = false;
    }

    return resp;
  }
}

module.exports = ModelProduct;
