 const express=require('express');
const router = express.Router();

// Token
const auth = require('../middlewares/auth');


const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/posts');

// Requête POST pour publier un nouveau post
router.post('', auth, multer, postCtrl.createPost);

// Requête DELETE pour supprimer un post
router.delete('/:postId', auth, postCtrl.deletePost);
router.put('/:postId', auth, multer, postCtrl.modifyPost);
// Requête GET pour afficher les posts
router.get('', auth, multer, postCtrl.getAllPosts);



module.exports = router;