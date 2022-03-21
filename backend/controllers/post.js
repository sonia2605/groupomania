// Imports
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const fs = require("fs");

// Permet de créer un nouveau message
exports.createPost = (req, res) => {
  const content = req.body.content;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  // Permet de vérifier que tous les champs sont complétés
  if (content == null || content == "") {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être renseignés" });
  }

  // Permet de contrôler la longueur du titre et du contenu du message
  if (content.length <= 4) {
    return res.status(400).json({
      error: "Le contenu du message doit contenir au moins 4 caractères",
    });
  }
  db.User.findOne({
    where: { id: userId },
  })
    .then((userFound) => {
      if (userFound) {
        const post = db.Post.build({
          content: req.body.content,
          UserId: userFound.id,
          imagePost: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imagePost
        });
        post
          .save()
          .then(() =>
            res.status(201).json({ message: "Votre message a bien été créé !" })
           )
          .catch((error) =>
            res
              .status(400)
              .json({ error: "Une erreur s'est produite !" })
          );
      } else {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "erreur serveur" })
    );
};

// Permet d'afficher tous les messages
exports.getAllPosts = (req, res) => {
  db.Post.findAll({
      order: [['createdAt', "DESC"]] ,
      include: [{
          model: db.User,
          attributes: ['username']
      },]
  })
  .then(postFound => {
        return  res.status(200).json(postFound);
  })
  .catch(error => {
      res.status(500).send({ error: 'Une erreur s\'est produite !' });
  });
}
// Permet de modifier un message)
exports.modifyPost = (req, res) => {

  db.Post.update({
    content: req.body.content},
    {where: { id: (req.params.postId)}})
  return res.status(200)
              .send({ message: "Votre message a bien été modifié !" })
          
    .catch((error) =>
      res.status(500).json({ error: "Une erreur s'est produite !" })
    );
};

// Permet de supprimer un message
exports.deletePost = (req, res, next) => {
  // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données 
  db.Post.findOne ({ 
  where: { id: req.params.postId }})          
  db.Post.destroy({where:{id: req.params.postId }})
  .then(() => res.status(200).json({ message: 'post supprimé !'}))
  .catch(error => res.status(400).json({ error: "Une erreur s'est produite" }));        
  };
   
 
