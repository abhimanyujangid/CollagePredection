import { Schema, model } from "mongoose";
import { AvailableCollegeStreams, AvailableCollegeTypes, CollegeTypeEnum } from "../constants.js";

const collegeSchema = new Schema({
  administratorId: { type: Schema.Types.ObjectId, ref: "CollegeAdminProfile", required: true },
  collegeName: { type: String, required: true },
  rankingNIRF: { type: Number, default: 0 },
  university: { type: String, required: true },
  type: { type: String, enum: AvailableCollegeTypes, default: CollegeTypeEnum.PRIVATE },
  typeOfCollege: {
    type: String, enum: AvailableCollegeStreams
    , required: true
  },
  logo: {
    type: {
      public_id: String,
      url: String
    }, default: ""
  }, // College logo URL
  address: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
  },
  website: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  description: { type: String },
  rating: { type: Number, default: 0 }, // College rating (e.g., out of 5)
  placementStatistics: {
    averagePackage: { type: Number, default: 0 }, // Avg salary in LPA
    highestPackage: { type: Number, default: 0 }, // Highest salary in LPA
    topRecruiters: [{ type: String }], // Companies visiting for placements
  },
}, { timestamps: true });

export const College = model("College", collegeSchema);