const express = require('express');
const router = express.Router();
// Token
const auth = require('../middlewares/auth');
const commentCtrl = require ('../controllers/comment');

// Requête POST pour créer un commentaire
router.post('/:postId', auth, commentCtrl.createComment);

// Requête GET pour récupérer les commentaires
router.get('/:postId', auth, commentCtrl.getAllComments);

// Requête DELETE pour supprimer un commentaire publié
router.delete('/:commentId', auth, commentCtrl.deleteComment);


module.exports = router;