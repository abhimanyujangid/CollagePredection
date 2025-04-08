import { Router } from "express";
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";
import { createCollege, getAdministratorAllColleges, getCollegeById, updateCollege,createStreamOfCollege } from "../controllers/college.controller.js";
import { upload } from '../middlewares/multer.middleware.js'
import { collegeRegisterValidator } from "../validators/app/auth/college.validation.js";
import { UserRolesEnum } from "../constants.js";

const router = Router();

// Multer Middleware for File Uploads
const uploadMiddleware = upload.fields([
    { name: "logo", maxCount: 1 }
]);

// Routes
router.post(
    "/",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    uploadMiddleware,
    collegeRegisterValidator(),
    createCollege
);
router.get(
    "/:id",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    getCollegeById
);
router.get(
    "/",
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.COLLEGE_ADMIN]),
    getAdministratorAllColleges
);
router.put(
    "/:id",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    uploadMiddleware,
    collegeRegisterValidator(),
    updateCollege
);

router.post(
    "/:collegeId/stream",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    createStreamOfCollege
);


export default router;