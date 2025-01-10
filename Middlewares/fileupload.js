// const multer = require('multer');

// // Multer configuration for file upload (image)
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         if (
//             file.mimetype == "image/png" ||
//             file.mimetype == "image/jpeg" ||
//             file.mimetype == "image/jpg"
//         ) {
//             callback(null, true);
//         } else {
//             console.log('only jpg,jpeg & png supported');
//             callback(null, false);
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// });

// module.exports = {
//     upload
// }

const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Save in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Extract file extension
        cb(null, `banner-${Date.now()}${ext}`); // Generate a unique file name
    },
});

// File upload filter and size limit
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            console.log("Unsupported file format. Only .jpg, .jpeg, and .png are allowed.");
            cb(new Error("Only .jpg, .jpeg, and .png formats are allowed."));
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB file size limit
    },
});

// Image ratio validation middleware
const validateImageRatio = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }

    try {
        const metadata = await sharp(req.file.path).metadata();
        const ratio = metadata.width / metadata.height;

        // Expected ratio 3:1
        if (Math.abs(ratio - 3 / 1) > 0.01) {
            // Remove invalid file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: "Invalid image ratio. Expected 3:1." });
        }

        next(); // Proceed to the next middleware or controller
    } catch (err) {
        // Handle image processing errors
        console.error("Image processing error:", err.message);
        return res.status(500).json({ message: "Image processing failed.", error: err.message });
    }
};

module.exports = { upload, validateImageRatio };
