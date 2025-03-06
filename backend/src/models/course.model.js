import mongoose, { Schema, model } from "mongoose";

// Course Schema (Each Course belongs to a Stream)
const courseSchema = new Schema({
  streamId: { type: mongoose.Schema.Types.ObjectId, ref: "Stream", required: true },
  branches: { type: String }, // e.g., ["CSE", "Mechanical", "Civil"]
  seats: { type: Number, default: 0 }, // Total number of seats in the course
  fees: { type: Number, default: 0 }, // Annual fees in INR
  minimumEntranceScore: { type: Number, default: 0 }, // Minimum score required in entrance exam
}, { timestamps: true });

export const Course = model("Course", courseSchema);
