import {Schema, model} from "mongoose";

const constantDataSchema = new Schema({
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    streams: [{ type: String, required: true }], // for 12th stream
    states: [{ type: String, required: true }], // for college state
    collegeStreams: [{ type: String, required: true }], // for collage stream
    competitiveExams: [{ type: String, required: true, uppercase: true }], // for competitive exams
}, {
    timestamps: true
});

export const ConstantData = model('ConstantData', constantDataSchema);

