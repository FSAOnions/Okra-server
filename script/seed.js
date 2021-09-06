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
    product_name: "Caffè Americano",
    product_imgUrl: loadAsset("/Drink/Coffee/image.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 499,
    description:
      "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/Drink/Coffee/coffee_cup_obj.obj`),
      mtl: loadAsset(`/Drink/Coffee/coffee_cup_obj.mtl`),
      type: "OBJ",
      scale: 0.2,
      rotate: 0,
    },
  },
  {
    product_name: "Pizza",
    product_imgUrl: loadAsset("/Entree/Pizza/pizzaslice.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 499,
    description:
      "Thin-crust oven baked pizza topped with spicy pepperon, mozzarella, and homemade tomato sauce.",
    product_type: "Entree",
    assets: {
      name: "pizza",
      source: loadAsset(`/Entree/Pizza/Pizza.obj`),
      mtl: loadAsset(`/Entree/Pizza/Pizza.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Reuben",
    product_imgUrl: loadAsset("/Entree/Reuben/rubensandwich.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 699,
    description:
      "With layers of mouthwatering meat, yummy fillings (of your choice), and crunchy vegetables, Arby’s reuben sandwich is truly an iconic dish! Who can say no to a sandwich stuffed with flavorful sauces, melted cheese, and luscious meat fillings? ",
    product_type: "Entree",
    assets: {
      name: "reuben",
      source: loadAsset(
        `/Entree/Reuben/13931_Reuben_Sandwich_on_Plate_v2_L1.obj`
      ),
      mtl: loadAsset(`/Entree/Reuben/13931_Reuben_Sandwich_on_Plate_v2_L1.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Pie",
    product_imgUrl: loadAsset("/Dessert/Pie/pie.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1399,
    description:
      "Filled with the perfect blend of locally grown Granny Smith and Cortland apples, seasoned with a hint of cinnamon and sugar and topped with our original buttery flaky pie crust.",
    product_type: "Dessert",
    assets: {
      name: "pie",
      source: loadAsset(`/Dessert/Pie/11547_Dessert_pie_v3_l2.obj`),
      mtl: loadAsset(`/Dessert/Pie/11547_Dessert_pie_v3_l2.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Pretzel",
    product_imgUrl: loadAsset("/Appetizer/Pretzel/pretzel.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 499,
    description:
      "Mall pretzels that you can now enjoy in the comfort of your home for a fraction of the price with countless dipping sauce option! They are the perfect party food or snack to impress guests with and they really are easier to make than you’d think.",
    product_type: "Appetizer",
    assets: {
      name: "pretzel",
      source: loadAsset(
        `/Appetizer/Pretzel/13933_Big_Pretzel_on_Napkin_v3_l2.obj`
      ),
      mtl: loadAsset(
        `/Appetizer/Pretzel/13933_Big_Pretzel_on_Napkin_v3_l2.mtl`
      ),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Birthday Cake",
    product_imgUrl: loadAsset("/Dessert/BirthdayCake/cake.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1299,
    description:
      "This quadruple-layer cake isn't nearly as fussy to make as you might think. It starts out as a standard two-layer cake, then each layer is cut in half and stacked, with an easy filling in between the layers. The result is a moist cake that keeps well without refrigeration; looks spectacular when cut, and tastes even better than it looks!",
    product_type: "Dessert",
    assets: {
      name: "birthdaycake",
      source: loadAsset(`/Dessert/BirthdayCake/10868_birthday-cake_v3.obj`),
      mtl: loadAsset(`/Dessert/BirthdayCake/10868_birthday-cake_v3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Cabernet Sauvignon",
    product_imgUrl: loadAsset("/Drink/Wine/wine.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1099,
    description:
      "Woodbridge by Robert Mondavi Cabernet Sauvignon Red Wine is a medium-bodied California wine that opens with enticing aromas of cherries, berries, rich cedar, brown sugar, and toast.",
    product_type: "Drink",
    assets: {
      name: "red wine",
      source: loadAsset(`/Drink/Wine/14042_750_mL_Wine_Bottle_r_v1_L3.obj`),
      mtl: loadAsset(`/Drink/Wine/14042_750_mL_Wine_Bottle_r_v1_L3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Coca Cola",
    product_imgUrl: loadAsset("/Drink/Soda/cokecan.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 199,
    description: "Fizzy, cold, delicious",
    product_type: "Drink",
    assets: {
      name: "cocacola",
      source: loadAsset(`/Drink/Soda/14025_Soda_Can_v3_l3.obj`),
      mtl: loadAsset(`/Drink/Soda/14025_Soda_Can_v3_l3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Cupcake",
    product_imgUrl: loadAsset("/Dessert/Cupcake/cupcake.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 199,
    description: "Yummy mmm good",
    product_type: "Dessert",
    assets: {
      name: "cupcake",
      source: loadAsset(`/Dessert/Cupcake/12187_Cupcake_v1_L3.obj`),
      mtl: loadAsset(`/Dessert/Cupcake/12187_Cupcake_v1_L3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Bread",
    product_imgUrl: loadAsset("/HighPolyFood/Bread/005.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1999,
    description: "Yummy mmm good",
    product_type: "Appetizer",
    assets: {
      name: "bread",
      source: loadAsset(`/HighPolyFood/Bread/005.obj`),
      mtl: loadAsset(`/HighPolyFood/Bread/005.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: 0,
    },
  },
  {
    product_name: "Burrito",
    product_imgUrl: loadAsset("/HighPolyFood/Burrito/042.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1999,
    description: "Yummy mmm good",
    product_type: "Entree",
    assets: {
      name: "burrito",
      source: loadAsset(`/HighPolyFood/Burrito/042.obj`),
      mtl: loadAsset(`/HighPolyFood/Burrito/042.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: 0,
    },
  },
  {
    product_name: "Pizza",
    product_imgUrl: loadAsset("/HighPolyFood/Pizza/035.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1999,
    description: "Yummy mmm good",
    product_type: "Entree",
    assets: {
      name: "pizza",
      source: loadAsset(`/HighPolyFood/Pizza/035.obj`),
      mtl: loadAsset(`/HighPolyFood/Pizza/035.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: 0,
    },
  },
  {
    product_name: "Ribs",
    product_imgUrl: loadAsset("/HighPolyFood/Ribs/049.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1999,
    description: "Yummy mmm good",
    product_type: "Entree",
    assets: {
      name: "ribs",
      source: loadAsset(`/HighPolyFood/Ribs/049.obj`),
      mtl: loadAsset(`/HighPolyFood/Ribs/049.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: 0,
    },
  },
  {
    product_name: "Steak",
    product_imgUrl: loadAsset("/HighPolyFood/Steak/050.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1999,
    description: "Yummy mmm good",
    product_type: "Entree",
    assets: {
      name: "steak",
      source: loadAsset(`/HighPolyFood/Steak/050.obj`),
      mtl: loadAsset(`/HighPolyFood/Steak/050.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: 0,
    },
  },
];

const restaurantSeed = [
  {
    name: "Starbucks",
    imgUrl: "RestaurantLogos/starbucks.jpeg",
    tables: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    name: "Shake Shack",
    imgUrl: "RestaurantLogos/shakeshack-logo.png",
    tables: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    name: "Pizza Hut",
    imgUrl: "RestaurantLogos/pizzahut.jpeg",
    tables: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    name: "Okra",
    imgUrl: "RestaurantLogos/okra.png",
    tables: [1, 2, 3, 4, 5, 6, 7]
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
    await allProducts[i].setRestaurant(4);
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
