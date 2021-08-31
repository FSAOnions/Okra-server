"use strict";

const { Restaurant, User, Product } = require("../server/db/models");

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
    product_imgUrl: loadAsset("/Coffee/image.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/Coffee/coffee_cup_obj.obj`),
      mtl: loadAsset(`/Coffee/coffee_cup_obj.mtl`),
      type: "OBJ",
      scale: 0.2,
      rotate: 0,
    },
  },
  {
    product_name: "Pizza",
    product_imgUrl: loadAsset("/Pizza/pizzaslice.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    product_type: "Entree",
    assets: {
      name: "pizza",
      source: loadAsset(`/Pizza/Pizza.obj`),
      mtl: loadAsset(`/Pizza/Pizza.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Reuben",
    product_imgUrl: loadAsset("/Reuben/rubensandwich.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    product_type: "Entree",
    assets: {
      name: "reuben",
      source: loadAsset(`/Reuben/13931_Reuben_Sandwich_on_Plate_v2_L1.obj`),
      mtl: loadAsset(`/Reuben/13931_Reuben_Sandwich_on_Plate_v2_L1.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Pie",
    product_imgUrl: loadAsset("/Dessert/pie.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    product_type: "Dessert",
    assets: {
      name: "pie",
      source: loadAsset(`/Dessert/11547_Dessert_pie_v3_l2.obj`),
      mtl: loadAsset(`/Dessert/11547_Dessert_pie_v3_l2.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Pretzel",
    product_imgUrl: loadAsset("/Pretzel/pretzel.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    product_type: "Appetizer",
    assets: {
      name: "pretzel",
      source: loadAsset(`/Pretzel/13933_Big_Pretzel_on_Napkin_v3_l2.obj`),
      mtl: loadAsset(`/Pretzel/13933_Big_Pretzel_on_Napkin_v3_l2.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Cake",
    product_imgUrl: loadAsset("/Cake/cake.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 5.99,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/Cake/10868_birthday-cake_v3.obj`),
      mtl: loadAsset(`/Cake/10868_birthday-cake_v3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
    {
      product_name: "Wine",
      product_imgUrl: loadAsset("/Wine/wine.png"), //img from Sung
      threeD_imgUrl: "", //img with mtl and obj
      price: 5.99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      product_type: "Drink",
      assets: {
        name: "red wine",
        source: loadAsset(`/Wine/14042_750_mL_Wine_Bottle_r_v1_L3.obj`),
        mtl: loadAsset(`/Wine/14042_750_mL_Wine_Bottle_r_v1_L3.mtl`),
        type: "OBJ",
        scale: 0.01,
        rotate: -90,
      },
  },
];

const restaurantSeed = [
  {
    name: "Starbucks",
    imgUrl: "RestaurantLogos/starbucks.jpeg",
  },
  {
    name: "Shake Shack",
    imgUrl: "RestaurantLogos/shakeshack-logo.png",
  },
  {
    name: "Pizza Hut",
    imgUrl: "RestaurantLogos/pizzahut.jpeg",
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
