const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const commentCtrl = require ('../controllers/comments');

// Requête POST pour créer un commentaire
router.post('/comments', commentCtrl.createComment);

// Requête GET pour récupérer les commentaires
router.get('/comments', auth, commentCtrl.getComments);

// Requête DELETE pour supprimer un commentaire publié
router.delete('/comments/:id', auth, commentCtrl.deleteComment);


module.exports = router;