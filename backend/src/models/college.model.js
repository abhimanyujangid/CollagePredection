import { Schema, model } from "mongoose";
import { AvailableCollegeStreams, AvailableCollegeTypes, CollegeTypeEnum } from "../constants.js";

const collegeSchema = new Schema({
  administratorId: { type: Schema.Types.ObjectId, ref: "CollegeAdminProfile", required: true },
  collegeName: { type: String, required: true },
  rankingNIRF: { type: Number, default: 0 },
  university: { type: String, required: true },
  type: { type: String, enum: AvailableCollegeTypes, default: CollegeTypeEnum.PRIVATE },
  typeOfCollege: {
    type: String,
     enum: AvailableCollegeStreams,
     required: true
  },
  instituteId:{
    type: String,
    required: true
  },
  logo_tag:{
    type: String
  },
  // logo: {
  //   type: {
  //     public_id: String,
  //     url: String
  //   }, default: ""
  // }, // College logo URL
  address: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
  },
  website: { type: String},
  contactNumber: { type: String },
  description: { type: String },
  teacherLeanerRatio:{
    type:Number,
    default:0
  },
  researchScore:{
    type:Number,
    default:0
  },
  perceptionScore:{
    type:Number,
    default:0
  },
  graducationOutcome:{
    type:Number,
    default:0
  },
  placementStatistics: {
    averagePackage: { type: Number, default: 0 }, // Avg salary in LPA
    highestPackage: { type: Number, default: 0 }, // Highest salary in LPA
    topRecruiters: [{ type: String }], // Companies visiting for placements
  },
}, { timestamps: true });

export const College = model("College", collegeSchema);