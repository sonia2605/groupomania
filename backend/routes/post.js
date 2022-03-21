const express=require('express');
const router = express.Router();

// Token
const auth = require('../middlewares/auth');


const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post');

// Requête POST pour publier un nouveau post
router.post('',auth, multer,  postCtrl.createPost);

// Requête GET pour afficher les posts
router.get('',auth, postCtrl.getAllPosts);


router.put('/:postId',auth, multer, postCtrl.modifyPost);

// Requête DELETE pour supprimer un post
router.delete('/:postId',auth, postCtrl.deletePost);


module.exports = router;