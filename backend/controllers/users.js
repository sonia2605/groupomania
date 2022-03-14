// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });
const {User} = require('../models/index.js');
const db = require("../models/index.js");

// Regex de validation
const emailRegex =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}/;

// Permet de créer un nouvel utilisateur
exports.signup = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // Permet de vérifier que tous les champs sont complétés
  if (
    email == null ||
    email == "" ||
    username == null ||
    username == "" ||
    password == null ||
    password == ""
  ) {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être renseignés" });
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
    return res
      .status(400)
      .json({
        error:
    "Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minuscule, un chiffre",
      });
  }

  // Permet de vérifier que l'utilisateur que l'on souhaite créer n'existe pas déjà
  db.User.findOne({
    attributes: ["username" || "email"],
    where: {
      username: username,
      email: email,
    },
  })
    .then((userExist) => {
      if (!userExist) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
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
              .catch(() =>
                res
                  .status(400)
                  .json({ error: "Une erreur s'est produite !" })
              );
          })
          .catch(() =>
            res
              .status(500)
              .json({
                error:
                  "Une erreur s'est produite lors de la création de votre compte",
              })
          );
      } else {
        return res.status(404).json({ error: "Cet utilisateur existe déjà" });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

// Permet à un utilisateur de se connecter
exports.login = (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              username: user.username,
              imageUrl: user.imageUrl,
              token: jwt.sign(
                { userId: user.id },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
              ),
            });
          })
          .catch(() =>
            res
              .status(500)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res
          .status(404)
          .json({
            error: "Cet utilisateur n'existe pas, veuillez créer un compte",
          });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

// Permet à un utilisateur d'accéder à son profil
exports.getUserProfile = (req, res) => {
  const id = req.params.id;
  db.User.findOne({
    attributes: ["id", "username", "email", "isAdmin", "imageUrl"],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch(() =>
      res.status(404).json({ error: "Une erreur s'est produite !" })
    );
};

// Permet à un utilisateur de modifier son profil
exports.modifyUserProfile = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  req.body.user = userId;

  console.log("bodyUser", req.body.user);
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      if (userFound) {
        db.User.update(userObject, {
          where: { id: userId },
        })
          .then((user) =>
            res
              .status(200)
              .json({ message: "Profil modifié avec succès !" })
          )
          .catch(() =>
            res
              .status(400)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

// Permet à un utilisateur de supprimer son compte
exports.deleteAccount = (req, res) => {
  const id = req.params.id;
  db.User.findOne({
    attributes: ["id"],
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
            res
              .status(500)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch(() =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};
