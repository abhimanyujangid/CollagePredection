import {Schema, model} from "mongoose";

const studentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    stream: {
        type: String,
        required: true,
    },
    educationDetails: {
        tenth: {
            schoolName: { type: String },
            board: { type: String },
            percentage: { type: Number },
            yearOfPassing: { type: Number },
        },
        twelfth: {
            schoolName: { type: String },
            board: { type: String },
            percentage: { type: Number },
            yearOfPassing: { type: Number },
        },
        competitiveExams: [
            {
                examName: { type: String }, // e.g., JEE, NEET, CET
                score: { type: Number },
                yearOfPassing: { type: Number },
            },
        ],
    },
    preferences: {
        preferredCourses: { type: String },
        preferredLocations: [{ type: String }],
    },
});

export const StudentProfile = model('StudentProfile', studentSchema);

