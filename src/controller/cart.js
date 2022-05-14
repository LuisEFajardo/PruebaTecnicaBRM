const { response } = require("express");
const ModelCart = require("../model/modelCart");
const modelCart = new ModelCart();

const addCart = async (req, res = response) => {
  const { idUser, listProduct, finalPrice } = req.body;
  let resp = false;

  resp = await modelCart.addCart({ idUser, listProduct, finalPrice });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error agregando la información de la compra" });
  }

  return res.status(200).json({ ok: true, msg: "Adición exitosa" });
};

const updateCart = async (req, res = response) => {
  const { id } = req.body;
  let resp = false;

  resp = await modelCart.editCart({ id });

  if (!resp) {
    return res
      .status(401)
      .json({ ok: false, msg: "Error finalziando la compra" });
  }

  return res.status(200).json({ ok: true, msg: "Finalización exitosa" });
};

module.exports = {
  addCart,
  updateCart
};
