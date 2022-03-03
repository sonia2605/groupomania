const fs = require('fs');

// on importe les modèles
let db = require('../models');
const Post = db.Post;
const User = db.User;
const getAuthUserId = require('../middlewares/getAuthUserId.middleware');
const post = require('../models/post');
const { restart } = require('nodemon');

// Créer un POST
exports.createPost = (req, res, next) => {
    if(!req.body.content) {
        res.status(400).send({
            message: "Erreur, message vide"
        });
        return
    }
    if(req.file){
        Post.create({
            userId: getAuthUserId(req),
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        .then(() =>res.status(201).json({
            message: 'post créé avec succès'
        }))
        .catch((error)=> res.status(400).json({
            error,
            message: 'Impossible de publier le post'
        }))
    }else {
        Post.create({
            userId: getAuthUserId(req),
            content: req.body.content,
            imageUrl: null,
        })
        .then(()=> res.status(201).json ({
            message: 'post créé !'
        }))
        .catch((error)=> res.status(400).json({
            error,
            message: 'Publication impossible'
        }))
    }
}

// Pour modifier une publication
exports.updatePost = (req, res, next)=> {
    Post.findOne ({
        where: {id: req.params.id}
    })
    .then(post => {
        if(post.userId !== getAuthUserId(req)){
            return res.status(404).json({
                error
            })
        };
    const postObjet = req.file? {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
        :{...req.body};
    Post.update({
        ...postObjet},
        {where: {id: req.params.id}
    }) 
    .then(()=> res.status(200).json({
        message: 'Publication modifiée avec succès'
    }))
    .catch(error => res.status(400).json({
        error
    }))
    });

// Supprimer une publication
exports.deletePost = (req, res, next) =>{
    Post.findOne({
        where: {
            id:req.params.id}
        })
    .then(post => {
        if(post.userId !== getAuthUserId(req)){
        return res.status(404).json({
            message: 'Requête impossible '
        })
    };
    if (req.file){
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            post.destroy({
                where: {id: req.params.id}
            })
            .then(()=> res.status(200).json({
                message: 'Publication supprimée avec succès'
            }))
            .catch(error => res.status(400).json({
                error
            }))
        })
    }else{
        post.destroy({
            where: {id:req.params.id}
        })
        .then(()=> res.status(200).json({
            message: 'Suppression publication'
        }))
        .catch(error => restart.status(400).json({
            error
        }))
    }
})
.catch(error => res.status(500).json({
    error,
    message: 'erreur, suppression impossible'
}))
};

// Afficher un message
exports.getOnePost = (req, res, next) => {
// On récupère l'Id du post depuis la BDD
Post.findOne ({
    whre: {id:req.params.id}
})
.then(post => res.status(200).json({
    post
}))
.catch(error => res.status(404).json({
    error,
    message: 'récupération publication impossible'
}))
};

// Afficher les posts
exports.getAllPosts =(req, res, next) => {
// On récupère tous les posts
Post.findAll({
    include: [{
        model: User,
        attributes: ['firstname', 'lastname', 'imageurl']
    }],
})
.then(posts => res.status(200).json({
    posts
}))
.catch(error => res.status(400).json({
    error
}))
};

exports.adminDeletePost =(req, res, next) => {
    Post.findOne({
        where: {id:req.params.id}
    })
.then(post => {
    if(req.file){
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            post.destroy({
                where: {id:req.params.id}
            }) 
        .then(()=> res.status(200).json({
            message: "publication membre supprimée avec succès"
        }))
        .catch(error => res.status(400).json ({
            error
        }))
        })
    }else{
        post.destroy({
            where: {id:req.params.id}
        })
        .then(()=> res.status(200).json({
            message: 'La publication du membre est supprimée'
        }))
        .catch(error=> res.status(400).json({
            error
        }))
    }
});
};
 

