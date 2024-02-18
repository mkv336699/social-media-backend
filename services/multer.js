const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/profile_pictures')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.username + ".png")
    }
})

module.exports = multer({ storage });
