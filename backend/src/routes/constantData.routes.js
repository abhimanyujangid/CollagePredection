import { Router } from "express";

import {
    createConstantDataMany,
    createConstantStreamDataMany,
    createConstantEntranceExamDataMany,
    getConstantData, 
    getConstantStreamData,
    getConstantEntranceExamData } from "../controllers/collegeConstant.controller.js";
import { validate } from "../validators/validate.js";

const router = Router()

//secured routes

// For creating constant data
router.route("/").post(validate, createConstantDataMany);
router.route("/stream").post(validate, createConstantStreamDataMany);
router.route("/entrance-exam").post(validate, createConstantEntranceExamDataMany);


// For getting constant data
router.route("/").get(validate, getConstantData);
router.route("/stream").get(validate, getConstantStreamData);
router.route("/entrance-exam").get( getConstantEntranceExamData);


export default router