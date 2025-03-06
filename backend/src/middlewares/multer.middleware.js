import multer from "multer";
import fs from "fs";

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileType = file.mimetype.startsWith("image") ? "images" : "pdfs";
        const uploadPath = `./public/temp/${fileType}`;

        // Ensure the directory exists
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File Filter - Allow only images and PDFs
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image and PDF files are allowed"), false);
    }
};

// Initialize Multer
export const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});
