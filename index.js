const express = require("express");
const Sequelize = require("sequelize");
const routerProduct = require("./src/routes/routerProduct");
const routerUser = require("./src/routes/routerUser");
const Conection = require("./src/model/conection");
const db = require("./models/index");
const { size } = require("lodash");
const routerCart = require("./src/routes/routerCart");

const conection = new Conection();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Se definen las rutas
app.use("/api/product", routerProduct);
app.use("/api/user", routerUser);
app.use("/api/cart", routerCart);

// Esta funcion realiza la cracion de las tablas de la base de datos y el usuarioa dmin
initDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function initDB() {
  await conection.autenticate();

  //Se crea la tabla de usuarios
  const user = await db.sequelize.define("user", {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.INTEGER
  });

  // Se crea la tabla audit_user para los logs de la tabla user
  await db.sequelize.define("audit_user", {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.INTEGER,
    action: Sequelize.STRING
  });

  // Se crea la tabla de los  producto
  await db.sequelize.define("product", {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true },
    numberLot: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.STRING,
    quantity: Sequelize.INTEGER
  });

  // Se crea la tabla de los log de los productos
  await db.sequelize.define("audit_product", {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true },
    numberLot: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
    action: Sequelize.STRING
  });

  // Se crea la tabla del carrito de compra
  await db.sequelize.define("cart", {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true },
    idUser: Sequelize.INTEGER,
    listProduct: Sequelize.JSON,
    finalPrice: Sequelize.STRING,
    state:Sequelize.STRING
  });

  // Se crea la tabla de logs del carrito de compra
  await db.sequelize.define("audit_cart", {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement: true },
    idUser: Sequelize.INTEGER,
    listProduct: Sequelize.JSON,
    finalPrice: Sequelize.STRING,
    state:Sequelize.STRING,
    action: Sequelize.STRING
  });

  //await db.sequelize.sync();

  // Force sync all models
  // It will drop the table first
  // and re-create it afterwards
  await db.sequelize.sync({ force: true });

  // Se valida si existe el trigger userT para borrarlo
  await db.sequelize.query(`DROP TRIGGER IF EXISTS userT;`);

  // Se crea el trigger userT para registrar los movimientos o logs del insert de la tabla users
  await db.sequelize.query(
    `CREATE TRIGGER userT before insert on users FOR EACH ROW INSERT INTO audit_users (name, email, password, role,createdAt, updatedAt, action) VALUES (NEW.name, NEW.email, NEW.password, NEW.role, NOW(), NOW(), 'insert')`
  );

  // Se valida si existe el trigger productTI para borrarlo
  await db.sequelize.query(`DROP TRIGGER IF EXISTS productTI;`);

  // Se crea el trigger userT para registrar los movimientos o logs del insert de la tabla products
  await db.sequelize.query(
    `CREATE TRIGGER productTI before insert on products FOR EACH ROW INSERT INTO audit_products (numberLot, name, price, quantity,createdAt, updatedAt, action) VALUES ( NEW.numberLot, NEW.name, NEW.price, NEW.quantity, NOW(), NOW(), 'insert')`
  );

  // Se valida si existe el trigger productTE para borrarlo
  await db.sequelize.query(`DROP TRIGGER IF EXISTS productTE;`);

  // Se crea el trigger userT para registrar los movimientos o logs del update de la tabla products
  await db.sequelize.query(
    `CREATE TRIGGER productTE before UPDATE on products FOR EACH ROW INSERT INTO audit_products (numberLot, name, price, quantity,createdAt, updatedAt, action) VALUES ( OLD.numberLot, OLD.name, NEW.price, NEW.quantity, NOW(), NOW(), 'edit')`
  );

  // Se valida si existe el trigger productTD para borrarlo
  await db.sequelize.query(`DROP TRIGGER IF EXISTS productTD;`);

  // Se crea el trigger userT para registrar los movimientos o logs del delete de la tabla products
  await db.sequelize.query(
    `CREATE TRIGGER productTD before delete on products FOR EACH ROW INSERT INTO audit_products (numberLot, name, price, quantity,createdAt, updatedAt, action) VALUES ( OLD.numberLot, OLD.name, OLD.price, OLD.quantity, NOW(), NOW(), 'delete')`
  );

  // Se valida si existe el trigger cartTI para borrarlo
  await db.sequelize.query(`DROP TRIGGER IF EXISTS cartTI;`);

  // Se crea el trigger userT para registrar los movimientos o logs del insert de la tabla cart
  await db.sequelize.query(
    `CREATE TRIGGER cartTI before insert on carts FOR EACH ROW INSERT INTO audit_carts (idUser, listProduct, finalPrice, state, createdAt, updatedAt, action) VALUES ( NEW.idUser, NEW.listProduct, NEW.finalPrice, NEW.state, NOW(), NOW(), 'insert')`
  );

    // Se valida si existe el trigger cartTE para borrarlo
    await db.sequelize.query(`DROP TRIGGER IF EXISTS cartTE;`);

    // Se crea el trigger userT para registrar los movimientos o logs del update de la tabla cart
    await db.sequelize.query(
      `CREATE TRIGGER cartTE before update on carts FOR EACH ROW INSERT INTO audit_carts (idUser, listProduct, finalPrice, state, createdAt, updatedAt, action) VALUES ( OLD.idUser, OLD.listProduct, OLD.finalPrice, NEW.state, NOW(), NOW(), 'update')`
    );

  // Se verifica si existe un usuario admin
  const exist = await user.findAll({
    where: {
      role: 1
    }
  });

  // Si no existe se crea el usuario admin
  if (size(exist) == 0) {
    await user.create({
      name: "admin",
      email: "admin@myshop.com",
      password: "Luis1234",
      role: 1
    });
  }

  //await conection.close();
}
