const adminToken = process.env.ADMIN_TOKEN || 'goldedge_admin_secret';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === `Bearer ${adminToken}`) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
