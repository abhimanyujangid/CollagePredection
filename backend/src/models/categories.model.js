import { Schema, model } from "mongoose";
import { AvailableCasts, AvailableGenders } from "../constants.js";

const categorieSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    caste: {
        type: String,
        required: true,
        enum: AvailableCasts
    },
    gender: {
        type: [{ type: String, enum: AvailableGenders }],
        required: true
    },
    quotas: [
        {
            quotaName: {
                type: String,
            },
            data: [
                {
                    year: { type: Number },
                    rank: { type: Number, default: null },
                }
            ]
        }
    ]
}, { timestamps: true });

export const Categorie = model("Categorie", categorieSchema);