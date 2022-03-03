const express=require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const authAdmin =require('../middlewares/authAdmin.middleware');

const multer = require('../middlewares/multer-config');
const postCtrl = require('../controllers/post.controllers');

// Requête POST pour publier un nouveau post
router.post('/post', auth, multer, postCtrl.createPost);

// Requête PUT pour modifier un post
router.put('/post/:id', auth, multer, postCtrl.updatePost);

// Requête DELETE pour supprimer un post
router.delete('/post/:id', auth, multer, postCtrl.deletePost);

// Requête GET pour afficher les posts
router.get('/post', auth, multer, postCtrlGetAllPosts);

// Requête GET pour afficher un post 
router.get('/post/:id', auth, multer, postCtrl.getOnePost);

// Requête DELETE administrateur pour supprimer un post
router.delete('/admin/delete/post/:id', authAdmin, multer, postCtrl.adminDeletePost);

module.exports = router;