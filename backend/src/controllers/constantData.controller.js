import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ConstantData } from "../models/constantData.model.js";
import { isValidObjectId } from "mongoose";

// Create ConstantData
export const createConstantData = asyncHandler(async (req, res) => {
    const { createBy, streams, states, collegeStreams, competitiveExams } = req.body;
    const { _id: userId } = req.user;

    if (![createBy, streams, states, collegeStreams, competitiveExams].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }
    const existingConstantData = await ConstantData.findOne({ createBy: userId });

    if (existingConstantData) {
        throw new ApiError(409, "ConstantData  already exists");
    }

    const constantData = await ConstantData.create(
        {
            createBy: userId,
            streams,
            states,
            collegeStreams,
            competitiveExams: competitiveExams.map((exam) => exam.toUpperCase()),
        }
    );
    res.status(201).json(new ApiResponse(201, constantData, "ConstantData created successfully"));
});

// Read ConstantData
export const getConstantData = asyncHandler(async (req, res) => {
    const constantData = await ConstantData.find();
    if (!constantData) {
        throw new ApiError(404, "ConstantData not found");
    }
    res.status(200).json(new ApiResponse(200, constantData, "ConstantData fetched successfully"));
});

// Update ConstantData
export const updateConstantData = asyncHandler(async (req, res) => {
    const { streams, states, collegeStreams, competitiveExams, createBy } = req.body;
    const constantDataId = req.params?.constantDataId;
    const { _id: userId } = req.user;

    // Validate request body
    if (![streams, states, collegeStreams, competitiveExams].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }

    // Validate ObjectId
    if (!isValidObjectId(constantDataId)) {
        throw new ApiError(400, "Invalid ConstantData ID");
    }

    // Ensure only the creator can update
    if (userId.toString() !== createBy) {
        throw new ApiError(403, "Forbidden: Only the creator can update ConstantData");
    }

    // Prepare update fields
    const updateFields = {
        streams,
        states,
        collegeStreams,
        competitiveExams: Array.isArray(competitiveExams)
            ? competitiveExams.map((exam) => exam.toUpperCase())
            : [],
    };

    // Update document
    const constantData = await ConstantData.findByIdAndUpdate(
        constantDataId,
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    if (!constantData) {
        throw new ApiError(404, "ConstantData not found");
    }

    res.status(200).json(new ApiResponse(200, constantData, "ConstantData updated successfully"));
});

// Delete ConstantData
export const deleteConstantData = asyncHandler(async (req, res) => {
    const _id =  req.params.constantDataId;
    if(!isValidObjectId(_id)){
        throw new ApiError(400, "Invalid ConstantData id");
    }

    const constantData = await ConstantData.findByIdAndDelete(_id);
    if (!constantData) {
        throw new ApiError(404, "ConstantData not found");
    }
    res.status(200).json(new ApiResponse(200, {}, "ConstantData deleted successfully"));
});

