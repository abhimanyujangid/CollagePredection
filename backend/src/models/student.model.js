import {Schema, model} from "mongoose";

const studentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    educationDetails: {
        tenth: {
            schoolName: { type: String },
            board: { type: String },
            percentage: { type: Number },
            yearOfPassing: { type: Number },
        },
        twelfth: {
            schoolName: { type: String },
            stream: { type: String }, // e.g., Science, Commerce, Arts
            board: { type: String },
            percentage: { type: Number },
            yearOfPassing: { type: Number },
        },
        hobby:{
            type: [String],
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

