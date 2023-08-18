const conn = require("./conn");
require("dotenv").config();
const { STRING, UUID, UUIDV4, ENUM } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  userType: {
    type: ENUM("ADMIN", "USER"),
    defaultValue: "USER",
    allowNull: false,
  },
});

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.fulfilled = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      fulfilled: false,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

//Get past orders
User.prototype.getPastOrders = async function () {
  const pastOrders = await conn.models.order.findOne({
    where: {
      userId: this.id,
      fulfilled: true,
    },
  });

  const pastOrders1 = await conn.models.order.findByPk(pastOrders.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return pastOrders1;
};

//Archive orders
User.prototype.archiveOrders = async function ({ product, quantity }) {
  const pastOrders = await this.getPastOrders();
  let lineItem = pastOrders.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: pastOrders.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getPastOrders();
};

//Fulfill an order (checkout)
User.prototype.checkout = async function () {
  const cart = await this.getCart();
  cart.fulfilled = true;
  await cart.save();
  return cart;
};

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
