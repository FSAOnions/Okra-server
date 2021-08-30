const { Product, CartItem, Cart } = require('../../db/models');

module.exports = {
  getUserCart: async (req, res, next) => {
    try {
      // get user cart will create an active cart if they don't have one.

      const { restaurantId } = req.params;
      let user = req.user;
      let cart = user.carts.find((cart) => cart.status === 'Cart');

      if (!cart) {
        cart = await Cart.create({
          userId: user.id,
          restaurantId,
        });
        await cart.setUser(user);
        await user.addCart(cart);
      }

      res.json(cart.products);
    } catch (e) {
      next(e);
    }
  },
  addItemToCart: async (req, res, next) => {
    try {
      // add to cart function is receiving a total quantity number of a specific food item and adding it to the db. For example, sequelize will throw an error if you try to add multiple 'burgers'.
      const { quantity } = req.query;
      const { productId } = req.params;
      let userQuantity = quantity;
      const user = req.user;
      const item = await Product.findByPk(productId);
      const cart = user.carts.find((cart) => cart.status === 'Cart');

      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId: item.id },
      });

      if (!cartItem) {
        await CartItem.create({
          cartId: cart.id,
          productId: item.id,
          price: item.price,
          quantity,
        });

        await cart.setUser(user.id);
        await user.addCart(cart.id);
      } else {
        let newQuantity = Number(cartItem.quantity) + Number(userQuantity);
        await cartItem.update({
          quantity: newQuantity,
        });
      }

      res.json(await Cart.findByPk(cart.id, { include: Product }));
    } catch (e) {
      next(e);
    }
  },
  deleteItemFromCart: async (req, res, next) => {
    try {
      // delete item from cart is being called when you delete one 3D object so this function will make sure we deduct one from the count and destroy the row if it goes below 1.
      const { productId } = req.params;

      const user = req.user;
      const item = await Product.findByPk(productId);
      const cart = user.carts.find((cart) => cart.status === 'Cart');
      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId: item.id },
      });

      let newQuantity = Number(cartItem.quantity) - 1;

      if (newQuantity < 1) {
        await CartItem.destroy({
          where: { cartId: cart.id, productId: item.id },
        });
      } else {
        await cartItem.update({
          quantity: Number(cartItem.quantity) - 1,
        });
      }

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
