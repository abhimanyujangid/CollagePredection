import mongoose, { Schema, model } from "mongoose";
import { AvailableCourseTypes, CourseTypeEnum } from "../constants.js";

// Course Schema (Each Course belongs to a Stream)
const streamSchema = new Schema({
  collageId: { type: mongoose.Schema.Types.ObjectId, ref: "Collage", required: true },
  streamName: { type: String, required: true }, // e.g., "B.Tech", "M.Tech", "MBA"
  type: { type: String, enum: AvailableCourseTypes, default: CourseTypeEnum.UNDERGRADUATE, required: true },
  duration: { type: Number, default: 0 }, // Duration in years
  fees: { type: Number, default: 0 }, // Annual fees in INR
  eligibilityCriteria: {
    minTwelfthPercentage: { type: Number, default: 50 },
    requiredExams:[ { type: String, default: null }],
  },
}, { timestamps: true });

export const Stream = model("Stream", streamSchema);
