import mongoose, { Schema, model } from "mongoose";

// Course Schema (Each Course belongs to a Stream)
const streamSchema = new Schema({
  collageId: { type: mongoose.Schema.Types.ObjectId, ref: "Collage", required: true },
  streamName: { type: String, required: true }, // e.g., "B.Tech", "M.Tech", "MBA"
  duration: { type: Number, default: 0 }, // Duration in years
  fees: { type: Number, default: 0 }, // Annual fees in INR
  eligibilityCriteria: {
    minTenthPercentage: { type: Number, default: 0 },
    minTwelfthPercentage: { type: Number, default: 0 },
    requiredExams: [{ type: String }], // e.g., ["JEE", "NEET"]
  },
}, { timestamps: true });

export const Stream = model("Stream", streamSchema);
