const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");
const Review = require("./Review");

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [
    moe,
    lucy,
    curly,
    larry,
    foo,
    bar,
    bazz,
    bcard1,
    bcard2,
    bcard3,
    gcard1,
    ethyl,
  ] = await Promise.all([
    User.create({ username: "moe", password: "123", email: "moe@email.com" }),
    User.create({ username: "lucy", password: "123", email: "lucy@email.com" }),
    User.create({ username: "curly", password: "123", email: "curly@email.com", userType: "ADMIN"}),
    User.create({
      username: "larry",
      password: "123",
      email: "larry@email.com",
    }),
    Product.create({ name: "foo" }),
    Product.create({ name: "bar" }),
    Product.create({ name: "bazz" }),
    Product.create({
      name: "1933 Babe Ruth Card",
      description: "Mint-condition Babe Ruth rookie card",
      imageUrl:
        "https://robbreport.com/wp-content/uploads/2021/05/baberuth.jpg",
      price: 2950,
    }),
    Product.create({
      name: "1991 Michael Jordan Card",
      description: "Mint-condition upper deck 1991 MJ baseball card",
      imageUrl:
        "https://ansel.frgimages.com/cincinnati-bengals/michael-jordan-1991-upper-deck-baseball-card-number-sp1-graded-psa-8_ss2_p-12996770+u-1gdx1rz2gpecu8hoxs5a+v-89420742250e43508bff97cf2be9ab06.jpg?_hv=2",
      price: 540,
    }),
    Product.create({
      name: "2003 Lebron James Card",
      description: "Used Lebron James rookie card 03-04",
      imageUrl: "https://m.media-amazon.com/images/I/61GU83x7dSL.jpg",
      price: 440,
    }),
    Product.create({
      name: "Dark Magician Yu-Gi-Oh Card",
      description: "2nd edition Dark Magician card",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRXrcP9QxIL-NEs3Cw6AoGI3Di1-ArNNnhiQ&usqp=CAU",
      price: 10,
    }),
    User.create({
      username: "ethyl",
      password: "123",
      email: "ethyl@email.com",
    }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3 });
  await ethyl.addToCart({ product: foo, quantity: 2 });
  await ethyl.addToCart({ product: bcard1, quantity: 1 });
  return {
    users: {
      moe,
      lucy,
      larry,
    },
    products: {
      foo,
      bar,
      bazz,
      bcard1,
      bcard2,
      bcard3,
      gcard1,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Review,
};
