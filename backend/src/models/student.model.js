import { Schema, model } from "mongoose";
import { AvailableCasts, AvailableGenders } from "../constants.js";

const studentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: AvailableGenders, required: true },
    cast: { type: String, enum: AvailableCasts, required: true },
    hobbies: [{ type: String }],
    preferences: {
        preferredCourses: { type: String },
        preferredLocations: [{ type: String }],
    },
});

export const StudentProfile = model('StudentProfile', studentSchema);

