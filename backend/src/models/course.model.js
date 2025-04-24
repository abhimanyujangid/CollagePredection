import mongoose, { Schema, model } from "mongoose";

// Course Schema (Each Course belongs to a Stream)
const courseSchema = new Schema({
  streamId: { type: mongoose.Schema.Types.ObjectId, ref: "Stream", required: true },
  branches: { type: String }, // e.g., ["CSE", "Mechanical", "Civil"]
}, { timestamps: true });

export const Course = model("Course", courseSchema);
