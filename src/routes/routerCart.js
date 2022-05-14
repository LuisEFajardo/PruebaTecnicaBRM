const express = require("express");
const { check } = require("express-validator");
const { addCart, updateCart } = require("../controller/cart");

const { validateRequest } = require("../middleware/validate_request");
const routerCart = express.Router();

routerCart.post(
  "/add",
  [
    check("idUser").not().isEmpty(),
    check("listProduct").not().isEmpty(),
    check("finalPrice").not().isEmpty()
  ],
  validateRequest,
  addCart
);

routerCart.post(
  "/update",
  [check("id").not().isEmpty()],
  validateRequest,
  updateCart
);

module.exports = routerCart;
