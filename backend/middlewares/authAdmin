const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    const isAdmin = decodedToken.isAdmin;
    if (isAdmin !== true) {
      throw 'accès refusé';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};