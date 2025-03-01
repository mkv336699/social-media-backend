const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/profile_pictures')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.username + ".png")
    }
});

// Storage Engine
const storage2 = new GridFsStorage({
    url: 'mongodb://localhost:27017/test',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads', // Should match the collection name
                };
                resolve(fileInfo);
            });
        });
    }
});

module.exports = multer({ storage: storage2 });
