import mongoose, { Schema, model } from "mongoose";

const phoneNumberSchema = new Schema({
  countryCode: { type: String, default: "+91" },
  number: { type: String, required: true }
}, { _id: false });

const documentSchema = new Schema({
  url: { type: String, default: "" },
  public_id: { type: String, default: "" }
}, { _id: false });

const educationSchema = new Schema({
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  institution: { type: String },
  yearOfPassing: { type: Number }
}, { _id: false });

const collegeAdminProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  fullName:{
    type:string,
    required:true
  },
  phoneNumber: { 
    type: phoneNumberSchema, 
    required: true 
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  profilePicture: { 
    type: documentSchema, 
    default: {} 
  },
  dateOfBirth: { type: Date },
  highestEducation: { 
    type: educationSchema, 
    required: true 
  },
  verificationDocuments: [documentSchema],
  bio: { type: String, maxlength: 300 },
  isVerified: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  // Flexible field for additional dynamic properties
  customFields: { type: Schema.Types.Mixed }
}, { 
  timestamps: true, 
  strict: false // Allows extra fields not defined in the schema
});

export const CollegeAdminProfile = model("CollegeAdminProfile", collegeAdminProfileSchema);
