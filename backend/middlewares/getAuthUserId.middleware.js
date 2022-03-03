require('dotenv').config();
const jwt = require('jsonwebtoken');

const getAuthUserId = (req) => {
//récupération du Token du header
const token = req.headers.authorization.split('')[1];
// vérification + decodage du token 
const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
// userId décodé
const userId = decodedToken.userId;

return userId;
};