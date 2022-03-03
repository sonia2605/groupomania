const express = require('express');
const router = express.Router();

//import controllers utilisateurs
const userCtrl = require('../controllers/users.controllers.js');

// middleware d'identification
const auth = require('../middlewares/auth.middleware.js');
const authAdmin = require('../middlewares/authAdmin.middleware.js')
const multer = require('../middlewares/multer-config.js');

// Post CRUD 
// Routes de l'API pour les utilisateurs 
router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
//récupérer le/les profil(s) utilisateur(s)
router.get('/users/:id', auth, multer, userCtrl.getProfil);
router.get('/users', auth, multer, userCtrl.getAllProfils);
//modifier le profil
router.put('/users/:id', auth, multer, userCtrl.updateProfil);
//supprimer le profil 
router.delete('/users/:id', auth, multer, userCtrl.deleteProfil);
//supprimer un profil avec le droit administrateur
router.delete('/admin/delete/:id', authAdmin, multer, userCtrl.adminDeleteProfilUser);


module.exports = router; 