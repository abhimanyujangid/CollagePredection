import mongoose, { Schema, model } from "mongoose";

const collegeAdminProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collegeId: { type: Schema.Types.ObjectId, ref: "College" }, // Direct link to college
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensures unique emails
    phoneNumber: { type: String, required: true },
    profilePicture: { type: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
    } },
    dateOfBirth: { type: Date },
    highestEducation: [
      {
        degree: { type: String, required: true },
        fieldOfStudy: { type: String },
        institution: { type: String },
        yearOfPassing: { type: Number },
      },
    ],
    experience: [
      {
        company: { type: String },
        jobTitle: { type: String },
        jobDescription: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    role: { type: String, enum: ["Super Admin", "College Admin"], default: "College Admin" }, // Role management
    verificationDocuments: [{ type: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
    } }], // Store document URLs for verification
    bio: { type: String, maxlength: 300 }, // Short admin bio
    isVerified: { type: Boolean, default: false }, // Verification status
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, 
  },
  { timestamps: true }
);

export const CollegeAdminProfile = model("CollegeAdminProfile", collegeAdminProfileSchema);
