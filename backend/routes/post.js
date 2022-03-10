const express=require('express');
const router = express.Router();

// Token
const auth = require('../middlewares/auth');


const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/posts');

// Requête POST pour publier un nouveau post
router.post('/post', auth, multer, postCtrl.createPost);

// Requête DELETE pour supprimer un post
router.delete('/:id', auth, postCtrl.deletePost);

// Requête GET pour afficher les posts
router.get('/', auth, multer, postCtrl.getAllPosts);

// Requête GET pour afficher un post 
router.get('/:userId', auth, multer, postCtrl.findAllPostUser);


module.exports = router;