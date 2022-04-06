// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: './config/.env' });
const db = require("../models/index.js");

// Regex de validation
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}/;

// Permet de créer un nouvel utilisateur
exports.signup = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Permet de vérifier que tous les champs sont complétés
  if (
    email == null ||
    email == "" ||
    username == null ||
    username == "" ||
    password == null ||
    password == ""
  ) {
    return res.status(400).json({ error: "Tous les champs doivent être renseignés" });
  }

  // Permet de contrôler la longueur du pseudo
  if (username.length <= 3 || username.length >= 15) {
    return res
      .status(400)
      .json({ error: "Le pseudo doit contenir 3 à 15 caractères" });
  }

  // Permet de contrôler la validité de l'adresse mail
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Adresse mail invalide" });
  }

  // Permet de contrôler la validité du mot de passe
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minuscule, un chiffre",
    });
  }

  // Permet de vérifier que l'utilisateur que l'on souhaite créer n'existe pas déjà
  db.User.findOne({
    attibutes: ['username' || 'email'],
    where: {
      username: username,
      email: email,
    },
  })
    .then(userExist => {
      if (!userExist) {
        bcrypt
          .hash(req.body.password, 10)
          .then(hash => {
            const user = db.User.build({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              isAdmin: 0,
            });
            user
              .save()
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Votre compte a bien été créé !" })
              )
              .catch((error) => res.status(400).json({ error: error }));
          })
          .catch(() =>
            res.status(500).json({
              error:
                "Une erreur s'est produite lors de la création de votre compte",
            })
          );
      } else {
        return res.status(404).json({ error: "Cet utilisateur existe déjà" });
      }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur est survenue' }));
};

// Permet à un utilisateur de se connecter
exports.login = (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              username: user.username,
              token: jwt.sign({ userId: user.id },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" },
              )
            });
          })
          .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
      } else {
        return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte' })
      }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}

// Permet à un utilisateur d'accéder à son profil
exports.getUserProfile = (req, res) => {
  const id = req.params.id;
  db.User.findOne({
    attributes: ['id', 'username', 'email', 'isAdmin'],
    where: { id: id }
  })
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        return res.status(404).json({ error: 'Utilisateur non trouvé' })
      }
    })
    .catch(error => res.status(404).json({ error: error }));
}


// Permet à un utilisateur de modifier son profil
exports.modifyUserProfile = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  req.body.user = userId;

  console.log('bodyparser', req.body.user);
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.user)
    } : { ...req.body };

  db.User.findOne({
    where: { id: userId },
  })
    .then(userFound => {
      if (userFound) {
        db.User.update(userObject, {
          where: { id: userId }
        })
          .then(user => res.status(200).json({ message: 'Profil modifié avec suxccès' }))
          .catch(error => res.status(400).json({ error: "Erreur !" }))
      } else {
        res.status(404).json({ error: 'utilisateur non trouvé' });
      }
    })
    .catch(error => res.status(500).json({ error: 'Oups, erreur' }));
}


// Permet à un utilisateur de supprimer son compte
exports.deleteAccount = (req, res) => {
  const id = req.params.id;
  db.User.findOne({
    attibutes: ['id'],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        db.User.destroy({
          where: { id: id },
        })
          .then(() =>
            res.status(200).json({ message: "Votre compte a été supprimé" })
          )
          .catch(() =>
            res.status(500).json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};
exports.me = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  //req.body.user = userId;
  //vérifier que le userId existe et le renvoyer sinon erreur
  console.log(userId);
  db.User.findOne({
    attributes: ['id'],
    where: { id: userId }
  })
    .then(user => {
      console.log(user);
      if (user) {
        res.status(200).json({
          user: user.id
        })
      } else {
        res.status(404).json({ error: 'user non trouvé' })
      }
    })
    .catch((error)=> ({error: error}));
};

