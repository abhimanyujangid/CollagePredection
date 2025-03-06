import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import mongoose from "mongoose";
import { User } from "../models/user.model.js"
import { CollegeAdminProfile } from "../models/collegeAdminProfile.model.js";

// @desc    Create College Admin Profile
// @route   POST /api/college-admins
// @access  Private (Only Admins)
export const createCollegeAdminProfile = asyncHandler(async (req, res) => {
    const {   email, phoneNumber, gender, dateOfBirth, highestEducation, experience, role, verificationDocuments, bio } = req.body;
    const { _id: userId } = req.user;

    // Validate required fields
    if (![ email, phoneNumber, gender, dateOfBirth, highestEducation, experience, role].every(Boolean)) {
        throw new ApiError(400, "User ID, Full Name, Email, and Phone Number are required");
    }


    // Check if College Admin Profile already exists
    const existingProfile = await CollegeAdminProfile.findOne({ userId });
    if (existingProfile) throw new ApiError(409, "College Admin Profile already exists");

    // Create College Admin Profile
    const collegeAdminProfile = await CollegeAdminProfile.create({
        userId,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        highestEducation,
        experience,
        role,
        verificationDocuments,
        bio,
    });

    if (!collegeAdminProfile) throw new ApiError(500, "Failed to create College Admin Profile");

    res.status(201).json(new ApiResponse(201, collegeAdminProfile, "College Admin Profile created successfully"));
});

// @desc    Get College Admin Profile by ID
// @route   GET /api/college-admins/:id
// @access  Private (Only Admins)
export const getCollegeAdminProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid College Admin ID");

    const collegeAdminProfile = await CollegeAdminProfile.findById(id).populate("userId", "fullName email");

    if (!collegeAdminProfile) throw new ApiError(404, "College Admin Profile not found");

    res.status(200).json(new ApiResponse(200, collegeAdminProfile, "College Admin Profile fetched successfully"));
});

// @desc    Update College Admin Profile
// @route   PUT /api/college-admins/:id
// @access  Private (Only Admins)
export const updateCollegeAdminProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid College Admin ID");

    const collegeAdminProfile = await CollegeAdminProfile.findById(id);
    if (!collegeAdminProfile) throw new ApiError(404, "College Admin Profile not found");

    // Ensure the user is authorized to update the profile
    if (req.user._id.toString() !== collegeAdminProfile.userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only update your own profile");
    }

    // Update fields if provided
    const updatedProfile = await CollegeAdminProfile.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(200).json(new ApiResponse(200, updatedProfile, "College Admin Profile updated successfully"));
});

// @desc    Delete College Admin Profile
// @route   DELETE /api/college-admins/:id
// @access  Private (Only Super Admin)
export const deleteCollegeAdminProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid College Admin ID");

    const collegeAdminProfile = await CollegeAdminProfile.findById(id);
    if (!collegeAdminProfile) throw new ApiError(404, "College Admin Profile not found");

    // Ensure only Super Admin can delete profiles
    if (req.user.role !== "Super_Admin") {
        throw new ApiError(403, "Forbidden: Only Super Admins can delete College Admin Profiles");
    }

    await CollegeAdminProfile.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200, null, "College Admin Profile deleted successfully"));
});
