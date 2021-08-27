const { User, Product, CartItem, Cart } = require('../../db/models');

module.exports = {
  getUserCart: async (req, res, next) => {
    try {
      const user = req.user;
      const cart = user.carts.find((cart) => cart.status === 'Cart');

      res.json(cart.products);
    } catch (e) {
      next(e);
    }
  },
  addItemToCart: async (req, res, next) => {
    try {
      const { quantity } = req.query;
      const { productId } = req.params;
      const user = req.user;
      const item = await Product.findByPk(productId);
      let cart = user.carts.find((cart) => cart.status === 'Cart');
      if (!cart) {
        cart = await Cart.create({});
        await cart.setUser(user);
        await user.addCart(cart);
      }
      await CartItem.create({
        cartId: cart.id,
        productId: item.id,
        price: item.price,
        quantity,
      });

      await cart.setUser(user.id);
      await user.addCart(cart.id);

      res.json(await Cart.findByPk(cart.id, { include: Product }));
    } catch (e) {
      next(e);
    }
  },
  deleteItemFromCart: async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const user = req.user;
      const item = await Product.findByPk(itemId);
      const cart = user.carts.find((cart) => cart.status === 'Cart');
      await CartItem.destroy({ where: { cartId: cart.id, itemId: item.id } });

      res.json(await Cart.findByPk(cart.id, { include: Product }));
    } catch (e) {
      next(e);
    }
  },
  checkoutCart: async (req, res, next) => {
    try {
      const user = req.user;

      const lastCart = user.carts.find((cart) => cart.status === 'Cart');
      const userCart = await Cart.findByPk(lastCart.id, { include: Product });

      await userCart.update({ status: 'Purchased' });
      const newCart = await Cart.create();

      await newCart.setUser(user);
      await user.addCart(newCart);

      res.send(204);
    } catch (e) {
      next(e);
    }
  },
};
