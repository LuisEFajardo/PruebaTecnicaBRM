const express = require("express");
const { check } = require("express-validator");
const {
  addProduct,
  getProduct,
  deleteProduct,
  editProduct,
  getProducts
} = require("../controller/product");
const { validateRequest } = require("../middleware/validate_request");
const routerProduct = express.Router();

// Se definen las rutas para consumir la api

routerProduct.post("/", getProducts);

// para cada ruta se hace una validacion de los campos que debe contener el body
// Si la validacion es exitosa se lanza el controlador 
routerProduct.post(
  "/findProduct",
  [check("id").not().isEmpty()],
  validateRequest,
  getProduct
);

routerProduct.post(
  "/add",
  [
    check("numberLot").not().isEmpty(),
    check("name").not().isEmpty(),
    check("price").not().isEmpty(),
    check("quantity").not().isEmpty()
  ],
  validateRequest,
  addProduct
);

routerProduct.post(
  "/delete",
  [check("id").not().isEmpty()],
  validateRequest,
  deleteProduct
);

routerProduct.post(
  "/edit",
  [
    [check("id").not().isEmpty()],
    check("price").not().isEmpty(),
    check("quantity").not().isEmpty()
  ],
  validateRequest,
  editProduct
);

module.exports = routerProduct;
