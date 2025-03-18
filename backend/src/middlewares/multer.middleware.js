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
        let fileExtension = "";
        if (file.originalname.split(".").length > 1) {
          fileExtension = file.originalname.substring(
            file.originalname.lastIndexOf(".")
          );
        }
        const filenameWithoutExtension = file.originalname
          .toLowerCase()
          .split(" ")
          .join("-")
          ?.split(".")[0];
        cb(
          null,
          filenameWithoutExtension +
            Date.now() +
            Math.ceil(Math.random() * 1e5) + // avoid rare name conflict
            fileExtension
        );
      },
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
