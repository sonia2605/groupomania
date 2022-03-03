const getAuthUserIdToken = require('./getAuthUserId.middleware');

module.exports = (req, res, next) =>{
// récupère le userId de la requête
    const userId = req.body.userId;

// récupère les Headers de la requête authorization
    const reqAuthorization = req.headers.authorization;
try {
    if (!reqAuthorization) throw new Error ("erreur authentification");
// vérification userId avec la requête de l'userId du token
    if (userId && userId !== getAuthUserIdToken(req)) throw new Error ("non valide");
    next();
}catch (error){
    res.status(401).json({
        error
    });
}
};