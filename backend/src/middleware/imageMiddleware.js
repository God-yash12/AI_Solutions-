const multer = require('multer');
const path = require('path');



// Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(process.cwd(), 'public')); 
    },
    filename: function (req, file, callback) {
        console.log(file.originalname)
        const filename = Date.now().toString() + '-' + file.originalname;
        callback(null, filename);
    },
});

// File Filter for Images
const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        req.isFilevalid = true;
        callback(null, true);
    } else {
        req.isFilevalid = false;
        callback(new Error('Only JPG, JPEG, and PNG files are allowed'), false);
    }
};

// Multer Configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
});

module.exports = upload;
