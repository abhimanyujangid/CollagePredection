import { Router } from "express";

import {
    createConstantDataMany,
    createConstantStreamDataMany,
    createConstantEntranceExamDataMany,
    getConstantData, 
    getConstantStreamData,
    getConstantEntranceExamData,
    getCitys,
    getCourse,
getAllStreams } from "../controllers/collegeConstant.controller.js";
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

// For getting constant like city
router.route("/citys").get(validate, getCitys);
router.route("/streams").get(validate, getAllStreams);
router.route("/course").get(validate, getCourse);
export default router