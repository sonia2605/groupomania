const express = require('express');
const router = express.Router();

//import controllers utilisateurs
const userCtrl = require('../controllers/users');

// middleware d'identification
const auth = require('../middlewares/auth');
const authAdmin = require ('../middlewares/authAdmin')
const multer = require('../middlewares/multer-config');

// Post CRUD 
// Routes de l'API pour les utilisateurs 
// Enregistrer un nouvel utilisateur
router.post('/auth/signup', userCtrl.signup);
// Connexion d'un utilisateur
router.post('/auth/login', userCtrl.login);

// Récupérer le profil utilisateur
router.get('/users/:id', auth, multer, userCtrl.getProfil);
// Récupérer les profils 
router.get('/users', auth, userCtrl.getAllProfils);
// Modifier le profil utilisateur
router.put('/users/:id', auth, multer, userCtrl.updateProfil);
// Supprimer le profil
router.delete('/users/:id', auth, multer, userCtrl.deleteProfil);

// Suppression profil droit administrateur
//router.delete = require('/admin/delete/:id', authAdmin, multer, userCtrl.adminDeleteProfilUser);



module.exports = router;