import {Schema, model} from "mongoose";

const studentEducationalSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    twelfth: {
        stream: { type: String, required: true }, // e.g., Science, Commerce, Arts
        subjectsWithMarks: [
            {
                subject: { type: String },
                maxMarks: { type: Number },
                obtainedMarks: { type: Number },
            }
        ],
        board: { type: String, required: true },
        percentage: { type: Number, required: true },
        yearOfPassing: { type: Number, required: true},
    },
    competitiveExams: [
        {
            examName: { type: String }, // e.g., JEE, NEET, CET
            score: { type: Number },
            yearOfPassing: { type: Number },
            rank: { type: Number },
        },
    ],
}, { timestamps: true });


export const StudentEducational = model('StudentEducational', studentEducationalSchema);