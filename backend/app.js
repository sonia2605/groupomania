const express = require ('express');
require ('dotenv').config();

// accéder au chemin du système de fichiers
const path = require('path');
const helmet = require ('helmet');
const cors = require('cors');
const bodyParser = require ('body-parser');
const app = express();

const mongoSanitize = require('express-mongo-sanitize');
app.use(cors());

// configure la sécurité des en-têtes
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Cross-Origin-Resource-Policy','same-origin');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.removeHeader("Cross-Origin-Resource-Policy");
  next();
});

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//transforme le corps de la requête en objet JS utilisable //
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Validation des saisies utilisateurs en fonction des caractères interdits "_"
app.use(mongoSanitize ({
  replaceWith: '_'
}));

//Indique à Express qu'il faut gérer la ressource images de manière statique 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());


// les routes attendues par le frontend //

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);




module.exports = app;