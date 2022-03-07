const express = require ('express');
require ('dotenv').config();
const path = require('path');
const helmet = require ('helmet');
const cors = require('cors');
const bodyParser = require ('body-parser');

//const db = require('mysql2');
const app = express();

app.use(cors());

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Indique à Express qu'il faut gérer la ressource images de manière statique 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
// les routes attendues par le frontend //

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

 module.exports = app;