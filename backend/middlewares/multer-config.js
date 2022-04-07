const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    //stocker les images dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //générer un nouveau nom de fichier image
    filename: (req, file, callback) => {
        const name = file.originalname.replace(/\..+$/, '').split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');