import { Schema, model } from "mongoose";
import { AvailableCasts, AvailableGenders } from "../constants.js";

const studentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: AvailableGenders, required: true },
    city:{ type: String, required: true },
    state:{ type: String, required: true },
    cast: { type: String, enum: AvailableCasts, required: true },
});

export const StudentProfile = model('StudentProfile', studentSchema);

