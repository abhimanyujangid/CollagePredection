import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { College } from "../models/college.model.js";


export const createCollege = asyncHandler(async (req, res) => {
    const {  collegeName, rankingNIRF, university, address, website, email, contactNumber, description, placementStatistics } = req.body;
     const administratorId = req.user._id;

    const collegeExists = await College.findOne({ collegeName });
    if (collegeExists) throw new ApiError(400, "College name already exists");

    const administratorExists = await CollegeAdminProfile.findOne({administratorId});
    if (!administratorExists || administratorExists.status !== "approved") {
        throw new ApiError(400, "Administrator is not approved");
    }

    // Validate required fields

    if (![ collegeName, university, address.city, address.state].every(Boolean)) {
        throw new ApiError(400, "Required fields are missing");
    }

    const newCollege = await College.create({
        administratorId,
        collegeName,
        rankingNIRF,
        university,
        address,
        website,
        email,
        contactNumber,
        description,
        placementStatistics,
    });

    res.status(201).json(new ApiResponse(201, newCollege, "College created successfully"));
});

// @desc    Get all Colleges
export const getAdministratorAllColleges = asyncHandler(async (req, res) => {
    const administratorId = req.user._id;
    const colleges = await College.findMany({administratorId})
    if(!colleges) throw new ApiError(404, "Colleges not found");
    res.status(200).json(new ApiResponse(200, colleges, "Colleges fetched successfully"));
});


export const getCollegeById = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    const college = await College.findById(collegeId);
    if (!college) throw new ApiError(404, "College not found");

    res.status(200).json(new ApiResponse(200, college, "College details fetched successfully"));
});

export const updateCollege = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    const { collegeName, rankingNIRF, university, address, website, email, contactNumber, description, placementStatistics } = req.body;
    const updatedCollege = await College.findByIdAndUpdate({
        collegeName,
        rankingNIRF,
        university,
        address,
        website,
        email,
        contactNumber,
        description,
        placementStatistics,
    }, { new: true, runValidators: true });

    if (!updatedCollege) throw new ApiError(404, "College not found");

    res.status(200).json(new ApiResponse(200, updatedCollege, "College updated successfully"));
});


export const deleteCollege = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    if (!collegeId) throw new ApiError(400, "Invalid College ID");
    const deletedCollege = await College.findByIdAndDelete(collegeId);

    if (!deletedCollege) throw new ApiError(404, "College not found");

    res.status(200).json(new ApiResponse(200, null, "College deleted successfully"));
});
