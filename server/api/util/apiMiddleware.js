const { User } = require('../../db/models');

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies.token);
    next();
  } catch (e) {
    next(e);
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('Admin permissions required');
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { requireToken, requireAdmin };
