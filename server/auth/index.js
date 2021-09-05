const router = require("express").Router();
const { User } = require("../db/models");
const { requireToken } = require("../api/util/apiMiddleware");

router.post("/login", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.cookie("token", token, { maxAge: 8640000 });
    res.send(201);
  } catch (e) {
    next(e);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    res.cookie("token", token, { maxAge: 8640000 });
    res.send(201);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(e);
    }
  }
});

router.put("/currentRestaurant/:id", requireToken, async (req, res, next) => {
  try {
    const user = req.user;
    const updateUser = await User.findByPk(user.id);
    console.log(req.params.id, typeof req.params.id);

    await updateUser.update({
      currentRestaurantId: req.params.id ? Number(req.params.id) : null,
    });
    res.json(updateUser);
  } catch (e) {
    next(e);
  }
});

router.put("/update", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.send(await user.update(req.body));
  } catch (e) {
    next(e);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.cookies.token));
  } catch (e) {
    next(e);
  }
});

router.post("/leave", requireToken, async (req, res, next) => {
  try {
    await user.update({ currentRestaurantId: null });
    res.send(204);
  } catch (e) {
    next(e);
  }
});

router.delete("/logout", async (req, res, next) => {
  try {
    let cookie = req.cookies.token;
    if (cookie === undefined) {
      console.log("No Cookie Destroyed");
    } else {
      res.cookie("token", "", { maxAge: 0 });
      console.log("Cookie Destroyed");
    }
    res.send(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
