const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        academicDetails: {
            twelfth: {
                stream: {
                    type: String,
                    required: true
                },
                percentage: {
                    type: Number,
                    required: true
                },
                board: {
                    type: String,
                    required: true
                },
                state: {
                    type: String,
                    required: true
                }
            },
            tenth: {
                percentage: {
                    type: Number,
                    required: true
                },
                board: {
                    type: String,
                    required: true
                },
                state: {
                    type: String,
                    required: true
                }
            }
        },
        hobbies: {
            type: [String],
            default: []
        },
        interestedExams: [
            {
                examName: {
                    type: String,
                    required: true
                },
                examNumber: {
                    type: Number,
                    required: true
                }
            }
        ],
        extraCurriculars: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

