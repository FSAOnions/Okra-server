const { Product, Restaurant } = require('../../db/models');
const { requireToken } = require('../util/apiMiddleware');

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll();
      console.log({ products });
      res.send(products);
    } catch (e) {
      next(e);
    }
  },
  getSingleProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).send('Something went wrong!');
      }
      res.send(product);
    } catch (e) {
      next(e);
    }
  },
  getRestaurantMenu: async(req, res, next) => {
    try {
      const id = req.params.id
      const restaurantMenu = await Product.findAll({
        where: {
          restaurantId: id
        }
      })
      res.send(restaurantMenu)
    } catch (error) {
      next(error)
    }
  },
  getAllRestaurants: async (res, req, next) => {
    try {
      const restaurants = await Restaurant.findAll()
      console.log('restaurants from server', restaurants)
      res.send(restaurants)
    } catch (error) {
      next(error)
    }
  }
};
