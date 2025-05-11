import { Schema, model } from "mongoose";
import { AvailableCollegeStreams, AvailableCollegeTypes, CollegeTypeEnum } from "../constants.js";

const collegeSchema = new Schema({
  administratorId: { type: Schema.Types.ObjectId, ref: "CollegeAdminProfile", required: true },
  collegeName: { type: String, required: true },
  rankingNIRF: { type: Number, default: 0 },
  university: { type: String, required: true },
  type: { type: String, enum: AvailableCollegeTypes, default: CollegeTypeEnum.PRIVATE },
  typeOfCollege: [{
    type: String,
     enum: AvailableCollegeStreams,
     required: true
  }],
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
  campusLife: {
    type: Number,
    default: 0
  },
  infrastructureScore: {
    type: Number,
    default: 0
  },
  alumniScore: {
    type: Number,
    default: 0
  },
  placementScore: {
    type: Number,
    default: 0
  },
  averagePackage: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      }
  },
}, { timestamps: true });

export const College = model("College", collegeSchema);