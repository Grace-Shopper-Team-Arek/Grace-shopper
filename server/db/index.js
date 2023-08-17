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
    pcard1,
    pcard2,
    cohcard,
    bcard1,
    bcard2,
    bcard3,
    gcard1,
    mcard,
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
    Product.create({ 
      name: "Base Set Holographic Charizard", 
      description: "Card 4 of 102 of the Pokémon TCG base set",
      imageUrl: "https://archives.bulbagarden.net/media/upload/4/4e/CharizardBaseSet4.jpg",
      price: 50,
    }),
    Product.create({ 
      name: "Surfing Pikachu",
      description: "Promotional card feature Pikachu on a surfboard",
      imageUrl: "https://archives.bulbagarden.net/media/upload/thumb/1/1a/SurfingPikachuWizardsPromo28.jpg/648px-SurfingPikachuWizardsPromo28.jpg",
      price: 15,
    }),
    Product.create({ 
      name: "Statesman Hero card",
      description: "Statesman Hero card for the City of Heroes CCG",
      imageUrl: "https://archive.paragonwiki.com/w/images//thumb/f/f9/CCG_A_109_Statesman.png/375px-CCG_A_109_Statesman.png",
      price: 3,
    }),
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
    Product.create({ 
      name: "Black Lotus", 
      description: "Very good condition Black Lotus card",
      imageUrl: "https://product-images.tcgplayer.com/fit-in/656x656/21480.jpg",
      price: 10000,
    }),
    User.create({
      username: "ethyl",
      password: "123",
      email: "ethyl@email.com",
    }),
  ]);

  const users = [ethyl, larry, curly, moe, lucy];
  const products = [pcard1, pcard2, cohcard, bcard1, bcard2, bcard3, mcard, gcard1];
  const reviews = [
    ["Worst thing I've ever bought.", "Completely awful.", "This product made my wife leave me.", "I hate this thing.", "Utterly indefensible"],
    ["I don't get it, too confusing.", "Burst into flames after a handful of uses.", "Save your money, there's better out there.", "I had a bad day once and this product reminds of that day. Pretty good otherwise", "how access google.com website"],
    ["Not bad, but somewhat overpriced.", "It did the job.", "This product has some promise, but it needs a lot more polish.", "Fine for a beginner, but someone with more experience will need something higher-quality.", "Worked great, but I took off two stars when it suddenly and unexpectedly accelerated to 120mph and embedded itself in my wall."],
    ["Can't beat the price!", "Not this company's best output, but a solid feather in their cap.", "I bought one of these for my daughter and had to come back and get another for myself.", "Been using it for three years, still works great!", "Makes a great gift for a birthday or holiday."],
    ["Flawless!", "Buying this product is what finally earned me my father's approval.", "It's hard to believe they're offering something so high-quality at such a reasonable price.", "Buy it right away, you won't regret it.", "Been searching for a solution to my problem for years, this product is what finally solved it for me."],
  ];

  const ethylOrder = await Order.create({ userId: ethyl.id, fulfilled: true });

  await LineItem.create({ orderId: ethylOrder.id, productId: mcard.id, quantity: 3 });
  await LineItem.create({ orderId: ethylOrder.id, productId: pcard2.id, quantity: 2 });
  await LineItem.create({ orderId: ethylOrder.id, productId: bcard1.id, quantity: 1 });

  ethylOrder.fulfilled = true;
  await ethylOrder.save();

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  for(let i = 0; i < users.length; i++){
    for(let j = 0; j < products.length; j++){
      const rating = getRndInteger(0,5)
      const addIt = getRndInteger(1,3)
      // console.log("rating: ",rating+1," text: ", reviewText, act === 1 ? "Added" : "Not added")
      if(addIt === 1){
        const reviewText = reviews[rating.toString()].shift();
        await Review.create({
          userId: users[i].id,
          productId: products[j].id,
          rating: (rating + 1).toString(),
          review: reviewText,
        });
        reviews[rating.toString()].push(reviewText);
      }
    }
  }

};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Review,
};
