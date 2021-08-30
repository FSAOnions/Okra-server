"use strict";

const {
  Restaurant,
  User,
  Product,
} = require("../server/db/models");

const db = require("../server/db/db");

const serverUrl = "https://okra-onions.herokuapp.com";

const loadAsset = (path) => {
  return `${serverUrl}${path}`;
};

const userSeed = [
  {
    firstName: "albina",
    lastName: "u",
    email: "a@okra.com",
    password: "1234",
  },
  {
    firstName: "andrew",
    lastName: "bloodworth",
    email: "andrewb@okra.com",
    password: "1234",
  },
  {
    firstName: "mohamed",
    lastName: "adam",
    email: "mohameda@okra.com",
    password: "1234",
  },
  {
    firstName: "sung",
    lastName: "y",
    email: "sung@okra.com",
    password: "1234",
    isAdmin: true,
  },
];

const productSeed = [
  {
    product_name: "Coffee",
    product_imgUrl: loadAsset("/CoffeeCup/obj/1st_rend.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
      mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
      type: "OBJ",
      scale: 0.015,
    },
  },
  {
    product_name: "Coffee",
    product_imgUrl: loadAsset("/CoffeeCup/obj/Blue.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
      mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
      type: "OBJ",
      scale: 0.015,
    },
  },
  {
    product_name: "Coffee",
    product_imgUrl: loadAsset("/CoffeeCup/obj/Red.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
      mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
      type: "OBJ",
      scale: 0.015,
    },
  },
  {
    product_name: "Coffee",
    product_imgUrl: loadAsset("/CoffeeCup/obj/Green.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
      mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
      type: "OBJ",
      scale: 0.015,
    },
  },
];

const restaurantSeed = [
  {
    name: "Starbucks",
    imgUrl:
      "RestaurantLogos/starbucks.jpeg",
  },
  {
    name: "Shake Shack",
    imgUrl:
      "RestaurantLogos/shakeshack-logo.png",
  },
  {
    name: "Pizza Hut",
    imgUrl:
      "RestaurantLogos/pizzahut.jpeg",
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const myDB = {
    users: (() => userSeed.map((user) => user))(),
    products: (() => productSeed.map((product) => product))(),
    restaurants: (() => restaurantSeed.map((restaurant) => restaurant))(),
  };
  const { users, products, restaurants } = myDB;

  const allUsers = await User.bulkCreate(users, {
    returning: true,
  });

  const allProducts = await Product.bulkCreate(products, {
    returning: true,
  });
  const allRestaurants = await Restaurant.bulkCreate(restaurants, {
    returning: true,
  });

  const midwayPoint = Math.floor(allProducts.length / 2);

  for (let i = 0; i < allProducts.length; i++) {
    if (i < midwayPoint) {
      await allProducts[i].setRestaurant(1);
    } else {
      await allProducts[i].setRestaurant(2);
    }
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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
