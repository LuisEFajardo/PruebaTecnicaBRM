const express = require("express");
const { check } = require("express-validator");
const { login, register, getUser } = require("../controller/user");
const { validateRequest } = require("../middleware/validate_request");
const routerUser = express.Router();

routerUser.post(
  "/",
  [check("id").not().isEmpty()],
  validateRequest,
  getUser
);

routerUser.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  validateRequest,
  login
);

routerUser.post(
  "/register",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    check("name").not().isEmpty()
  ],
  validateRequest,
  register
);

module.exports = routerUser;
