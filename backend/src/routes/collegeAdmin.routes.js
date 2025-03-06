import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCollegeAdminProfile, getCollegeAdminProfile, deleteCollegeAdminProfile } from "../controllers/collegeAdmin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Multer Middleware for File Uploads
const uploadMiddleware = upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "verificationDocuments", maxCount: 5 }
]);

// Secured Routes
router.post("/college-admins", verifyJWT("administrator"), uploadMiddleware, createCollegeAdminProfile);
router.get("/college-admins", verifyJWT("administrator"), getCollegeAdminProfile);
router.delete("/college-admins/:id", verifyJWT("administrator"), deleteCollegeAdminProfile);

export default router;
