const express = require('express');
const router = express.Router();

//import controllers utilisateurs
const userCtrl = require('../controllers/users');

// middleware d'identification
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// Post CRUD 
// Routes de l'API pour les utilisateurs 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);

router.get('/:id/posts/comments', auth, userCtrl.findPostCom);

router.put('/:id', auth, multer, userCtrl.updateUser);

router.delete('/:id', auth, userCtrl.deleteUser);



module.exports = router;