// Imports
const jwt = require("jsonwebtoken");
const db = require("../models/index");

// Permet de créer un nouveau commentaire
exports.createComment = (req, res) => {    
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  
  db.Post.findOne({
    where: { id: req.body.postId }
  })
  .then(postFound => {
      if(postFound) {
        const comment = db.Comment.build({
              content: req.body.content,
              postId: postFound.id,
              userId: userId
          })
          console.log(comment);
          comment.save()
              .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
      } else {
          return res.status(404).json({ error: 'Message non trouvé'})
      }
  })
  
}

// Permet d'afficher tous les commentaires
exports.getAllComments = (req, res) => {
    db.Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            attributes: ['username']
        }]
    })
    .then(commentFound => {
        if(commentFound){
        res.status(200).json(commentFound);
        console.log(commentFound);
        }else{
            res.status(404).json({error: 'Aucun commentaire à afficher'});
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Oups une erreur !' });
        console.log(error);
    });
}


exports.deleteComment = (req, res) => {
  db.Comment.findOne ({ 
      attributes: ['id'],
      where: { id: req.params.commentId }})          
        db.Comment.destroy({where:{id: req.params.commentId }})
        .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error: "Une erreur!" }));
    
  };