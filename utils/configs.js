const multer = require('multer');
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});


cloudinary.config({
    cloud_name: 'dzoz9m7vv',
    api_key: '886667616881956',
    api_secret: 'PAYUzDKTXqacfDXdNFbjn6PciXk'
});

module.exports.uploadImage = (path, config) => {
    return cloudinary.v2.uploader.upload(path, config, (err, result) => {
        
        if(err) return Promise.reject(err);

        return Promise.resolve(result);
    
    });
}

module.exports.removeImage = (id) => {
    return cloudinary.api.delete_resources(id, (err, result) => {
        if(err) {
            console.log(err);
            return Promise.reject(err);
        }

        return Promise.resolve(result);    
    })
}

module.exports.decodeJwt = (token) => {
    return jwt.verify(token, require('../keys').jwt, (err, result) => {
        return Promise.resolve(result);
    });
}



module.exports.upload = multer({storage});