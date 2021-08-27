const { Product } = require('../../db/models');

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      console.log({ products });
      res.send(products);
    } catch (e) {
      next(e);
    }
  },
  getSingleProduct: async (req, res) => {
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
};
