import { Router } from "express";
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";
import { createCollegeAdminProfile, getCollegeAdminProfile, deleteCollegeAdminProfile } from "../controllers/collegeAdmin.controller.js";
import { upload } from '../middlewares/multer.middleware.js'
import { CollegeAdminProfileValidator } from "../validators/app/auth/collegeAdminProfile.js";
import { UserRolesEnum } from "../constants.js";

const router = Router();

// Multer Middleware for File Uploads
const uploadMiddleware = upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "verificationDocuments", maxCount: 5 }
]);

// Secured Routes
router.route("/create").post(verifyJWT, verifyPermission([UserRolesEnum.COLLEGE_ADMIN]), uploadMiddleware, CollegeAdminProfileValidator(), createCollegeAdminProfile);
router.route("/profile").get(verifyJWT, verifyPermission([UserRolesEnum.COLLEGE_ADMIN]), getCollegeAdminProfile);
router.route("/delete/:id").delete(verifyJWT, verifyPermission([UserRolesEnum.COLLEGE_ADMIN]), deleteCollegeAdminProfile);
// router.route("/update").put(verifyJWT, verifyPermission([UserRolesEnum.COLLEGE_ADMIN]), uploadMiddleware, CollegeAdminProfileValidator(), updateCollegeAdminProfile);

export default router;
