// Imports
const jwt = require("jsonwebtoken");
const db = require("../models/index");

// Permet de créer un nouveau commentaire
exports.createComment = (req, res, next) => {    
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  
  db.Post.findOne({
      where: { id: req.params.postId }
  })
  .then(postFound => {
      if(postFound) {
        const comment = db.Comment.build({
              content: req.body.content,
              postId: postFound.id,
              userId: userId
          })
          comment.save()
              .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
              .catch(error => res.status(400).json({ error }));
      } else {
          return res.status(404).json({ error: 'Message non trouvé'})
      }
  })
  .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}

exports.getAllComments = (req, res, next) => {
    model.Comment.findAll({
        include:[{
            model:db.Post,
            model:db.User,
            attributes: [ 'username' ]
        }],
         where: { postId: req.params.postId}
        })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(500).json(error, "Une erreur s'est produite"))
    
};


exports.deleteComment = (req, res) => {
  db.Comment.findOne ({ 
      where: { id: req.params.commentId }})          
        db.Comment.destroy({where:{id: req.params.commentId }})
        .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error: "Une erreur s'est produite" }));
    
  };