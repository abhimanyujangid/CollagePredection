import {Schema, model} from "mongoose";

const collegeCourseSchema = new Schema({
    typeOfCollege: { type: String, required: true },
    course: { type: String, required: true },
}, {
    timestamps: true
});

const collegeStreamSchema = new Schema({
    typeOfCollege: { type: String, required: true },
    stream: { type: String, required: true },
}, {
    timestamps: true
})

const entranceExamSchema = new Schema({
    typeOfCollege: { type: String, required: true },
    exam: { type: String, required: true, uppercase: true },
}, {
    timestamps: true
})



export const CollegeCourse = model("CollegeCourse", collegeCourseSchema);
export const CollegesStream = model("CollegeStream", collegeStreamSchema);
export const CollegeEntranceExam = model("CollegeEntranceExam", entranceExamSchema);
