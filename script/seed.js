"use strict";

const {
  Cart,
  Restaurant,
  Product,
  CartItem,
  User,
  db,
} = require("../server/db/models");


async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  await Restaurant.create({
    name: "McDonalds",
    imgUrl:
      "https://saferchemicals.org/wp-content/uploads/2021/01/McDonalds-sign-scaled.jpeg",
  });

  // await Product.create({
  //   product_name: "burger",
  //   product_imgUrl: "", //img from Sung
  //   threeD_imgUrl: "", //img with mtl and obj
  //   price: 15.99,
  //   description:
  //     "bison burger, fresh mozzarella, arugula, shaved parmesan, roasted tomato, pesto mayo",
  //   product_type: "Entree",
  //   restaurantId: 1,
  // });
  // await Product.create({
  //   product_name: "fries",
  //   product_imgUrl: "", //img from Sung
  //   threeD_imgUrl: "", //img with mtl and obj
  //   price: 4.99,
  //   description: "potato, ketchup, salt",
  //   product_type: "Appetizer",
  //   restaurantId: 1,
  // });

  await Product.create({
    product_name: "Coffee",
    product_imgUrl: "/CoffeeCup/obj/1st_rend.png", //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: `/CoffeeCup/obj/coffee_cup.obj`,
      mtl: `/CoffeeCup/obj/coffee_cup.mtl`,
      type: "OBJ",
      scale: 0.015,
    },
    restaurantId: 1,
  });
  
  await User.create({
    firstName: "Albina",
    lastName: "U",
    email: "A@okra.com",
    password: "1234",
  });
  await User.create({
    firstName: "Andrew",
    lastName: "Bloodworth",
    email: "AndrewB@okra.com",
    password: "12345678",
  });

  await User.create({
    firstName: "Mohamed",
    lastName: "ADAM",
    email: "MohamedA@okra.com",
    password: "12345678",
  });
  await Cart.create({
    status: "Purchased",
    total_price: 31.98,
    userId: 2,
    restaurantId: 1,
  });

  await Cart.create({
    status: "Cart",
    total_price: 25.97,
    userId: 1,
    restaurantId: 1,
  });

  await CartItem.create({
    quantity: 2,
    price: 31.98,
    cartId: 1,
    productId: 1,
  });
  await CartItem.create({
    quantity: 2,
    price: 9.98,
    cartId: 2,
    productId: 2,
  });
  await CartItem.create({
    quantity: 1,
    price: 15.99,
    cartId: 2,
    productId: 1,
  });
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
