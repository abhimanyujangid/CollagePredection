import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import mongoose from "mongoose";
import { StudentProfile } from "../models/student.model.js";

// @desc    Create Student Profile
// @route   POST /api/students
// @access  Private (User must be authenticated)
export const createStudentProfile = asyncHandler(async (req, res) => {
    const { phoneNumber, dateOfBirth, stream, educationDetails, preferences } = req.body;
    const {_id: userId} = req.user;

    if (![phoneNumber, dateOfBirth,educationDetails, stream, preferences].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }
    
    // Check if Student Profile already exists
    const existingProfile = await StudentProfile.findOne({ userId });
    if (existingProfile) throw new ApiError(409, "Student profile already exists");

    // Create Student Profile
    const studentProfile = await StudentProfile.create({
        userId,
        phoneNumber,
        dateOfBirth,
        stream,
        educationDetails,
        preferences,
    });

    if (!studentProfile) throw new ApiError(500, "Failed to create student profile");

    res.status(201).json(new ApiResponse(201, studentProfile, "Student profile created successfully"));
});

// @desc    Get Student Profile by ID
// @route   GET /api/students
// @access  Private (User must be authenticated)
export const getStudentProfile = asyncHandler(async (req, res) => {
    const { _id: userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) throw new ApiError(400, "Invalid User ID");

    const studentProfile = await StudentProfile.findOne({ userId }).populate("userId", "fullName email");

    if (!studentProfile) throw new ApiError(404, "Student profile not found");

    res.status(200).json(new ApiResponse(200, studentProfile, "Student profile fetched successfully"));
});

// @desc    Update Student Profile
// @route   PUT /api/students/:id
// @access  Private (User must be authenticated)
export const updateStudentProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid Student ID");

    const studentProfile = await StudentProfile.findById(id);
    if (!studentProfile) throw new ApiError(404, "Student profile not found");

    // Ensure the user is authorized to update the profile
    if (req.user._id.toString() !== studentProfile.userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only update your own profile");
    }

    // Update fields if provided
    const updatedProfile = await StudentProfile.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(200).json(new ApiResponse(200, updatedProfile, "Student profile updated successfully"));
});

// @desc    Delete Student Profile
// @route   DELETE /api/students/:id
// @access  Private (User must be authenticated)
export const deleteStudentProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid Student ID");

    const studentProfile = await StudentProfile.findById(id);
    if (!studentProfile) throw new ApiError(404, "Student profile not found");

    // Ensure the user is authorized to delete the profile
    if (req.user._id.toString() !== studentProfile.userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only delete your own profile");
    }

    await StudentProfile.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200, null, "Student profile deleted successfully"));
});
