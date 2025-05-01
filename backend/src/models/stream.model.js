import mongoose, { Schema, model } from "mongoose";
import { AvailableCourseTypes, CourseTypeEnum } from "../constants.js";

// Course Schema (Each Course belongs to a Stream)
const streamSchema = new Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College"},
  streamName: { type: String, required: true }, // e.g., "B.Tech", "M.Tech", "MBA"
  streamType: { type: String, enum: AvailableCourseTypes, default: CourseTypeEnum.UNDERGRADUATE, required: true },
  duration: { type: Number, default: 4 }, // Duration in years
  fees: { type: Number, default: 0 }, // Annual fees in INR
  eligibilityCriteria: {
    minTwelfthPercentage: { type: Number, default: 50 },
    requiredExams:[ { type: String, default: null }],
  },
}, { timestamps: true });

export const Stream = model("Stream", streamSchema);
