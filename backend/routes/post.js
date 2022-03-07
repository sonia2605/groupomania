const express=require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const authAdmin =require('../middlewares/authAdmin');

const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/posts');

// Requête POST pour publier un nouveau post
router.post('/', auth, multer, postCtrl.createPost);

// Requête PUT pour modifier un post
router.put('/:id', auth, multer, postCtrl.updatePost);

// Requête DELETE pour supprimer un post
router.delete('/:id', postCtrl.deletePost);

// Requête GET pour afficher les posts
router.get('/', auth, multer, postCtrl.getAllPosts);

// Requête GET pour afficher un post 
router.get('/:id', auth, multer, postCtrl.getOnePost);

// Requête DELETE administrateur pour supprimer un post
router.delete('/admin/delete/post/:id', authAdmin, multer, postCtrl.adminDeletePost);

module.exports = router;