const db = require("./db/db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require('../script/seed')

// const seed = require("../script/seed");

const init = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      require("dotenv").config();
    }
    if (process.env.SEED === "TRUE") {
      await seed();
    } else {
      await db.sync();
    }

    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
