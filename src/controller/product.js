const { response } = require("express");
const ModelProduct = require("../model/modelProduct");
const modelProduct = new ModelProduct();

// Este controlador retorna los productos existentes en el sistema
// Se llama a la funcion del modelo modelProduct
// Si resp es igual a false se presento un error y se envia un status 401
// Si resp es diferente de false se envia la información solicitada
const getProducts = async (req, res = response) => {
  let resp = false;

  resp = await modelProduct.getProducts();

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error consultando los productos" });
  }

  return res
    .status(200)
    .json({ ok: true, msg: "Consulta exitosa", listProducts: resp });
};


// Este controlador retorna un producto en especifico
// Con el id enviado como parametro se obtiene el producto
const getProduct = async (req, res = response) => {
  const { id } = req.body;
  let resp = false;

  resp = await modelProduct.getProduct({ id });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error consultando el producto" });
  }

  return res
    .status(200)
    .json({ ok: true, msg: "Consulta exitosa", product: resp });
};

// Este controlador agrega un producto
// Se obtiene la informacion del producto de los parametros
// Se envian a la funcion addProduct del modelo para guardar la información
const addProduct = async (req, res = response) => {
  const { numberLot, name, price, quantity } = req.body;
  let resp = false;

  resp = await modelProduct.addProduct({ numberLot, name, price, quantity });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error agregando el producto" });
  }

  return res.status(200).json({ ok: true, msg: "Adición exitosa" });
};

// Este controlador realiza la edicion de un producto
// Se obtiene el id del producto y la información a editar
// Se envia la informacion a la funcion editProduct del modelo para realizar la edición
const editProduct = async (req, res = response) => {
  const { id, price, quantity } = req.body;
  let resp = false;

  resp = await modelProduct.editProduct({ id, price, quantity });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error editando el producto" });
  }

  return res.status(200).json({ ok: true, msg: "Edición exitosa" });
};

// Este controlador realiza la eliminación de un producto
// Se obtiene el id del producto
// Se envia el id a la funcion editProduct del modelo para realizar la eliminación
const deleteProduct = async (req, res = response) => {
  const { id } = req.body;
  let resp = false;

  resp = await modelProduct.deleteProduct({ id });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error eliminando el producto" });
  }

  return res.status(200).json({ ok: true, msg: "Eliminación exitosa" });
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct
};
