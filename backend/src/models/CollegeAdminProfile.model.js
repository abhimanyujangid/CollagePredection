import mongoose, { Schema, model } from "mongoose";

const collegeAdminProfileSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        phoneNumber: { type: String, required: true },
        dateOfBirth: { type: Date },
        highestEducation: [
            {
                degree: { type: String, required: true },
                fieldOfStudy: { type: String },
                institution: { type: String },
                yearOfPassing: { type: Number },
            },
        ],
        experience: [
            {
                company: { type: String },
                jobTitle: { type: String },
                jobDescription: { type: String },
                startDate: { type: Date },
                endDate: { type: Date },
            },
        ],
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, 
    },
    { timestamps: true }
);

export const CollegeAdminProfile = model("CollegeAdminProfile", collegeAdminProfileSchema);
