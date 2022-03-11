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


router.get('/:id', auth, userCtrl.getUserProfile);

router.put('/:id', auth, multer, userCtrl.modifyUserProfile);

router.delete('/:id', auth, userCtrl.deleteAccount);



module.exports = router;