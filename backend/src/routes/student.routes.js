import { Router } from "express";
import {
    createStudentProfile,
    createEducationDetails,
    updateStudentProfile,
    getStudentData,
    updateEducationDetails
} from '../controllers/student.controller.js'
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";

import {StudentProfileValidator, StudentEducationValidator} from '../validators/app/auth/student.validators.js'
import { UserRolesEnum } from "../constants.js";

const router = Router()



//secured routes
router.post('/profile', verifyJWT, StudentProfileValidator(), verifyPermission([UserRolesEnum.STUDENT]), createStudentProfile)
router.post('/education', verifyJWT, StudentEducationValidator(), verifyPermission([UserRolesEnum.STUDENT]), createEducationDetails)
router.put('/profile', verifyJWT, StudentProfileValidator(), verifyPermission([UserRolesEnum.STUDENT]), updateStudentProfile)
router.put('/education', verifyJWT, StudentEducationValidator(), verifyPermission([UserRolesEnum.STUDENT]), updateEducationDetails)
router.get('/profile', verifyJWT, getStudentData)


export default router