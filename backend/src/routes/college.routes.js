import { Router } from "express";
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";
import { 
    createCollege, 
    getAdministratorAllColleges, 
    getCollegeById, 
    updateCollege,
    createStreamOfCollege,
    deleteStream,
    createCourseOfStream,
    updateCourse,
    deleteCourse 
} from "../controllers/college.controller.js";
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

//================================= STREAM ROUTES ==========================================

router.post(
    "/:collegeId/stream",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    createStreamOfCollege
);

router.delete(
    "/stream/:streamId",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    deleteStream
);


//================================= COURSE ROUTES ==========================================
router.post(
    "/:streamId/course",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    createCourseOfStream
);

router.put(
    "/course/:courseId",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    updateCourse
);

router.delete(
    "/course/:courseId",
    verifyJWT,
    verifyPermission([UserRolesEnum.COLLEGE_ADMIN]),
    deleteCourse
);



//============================================================================================



export default router;