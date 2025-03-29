import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import mongoose from "mongoose";
import { CollegeAdminProfile } from "../models/collegeAdminProfile.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const createCollegeAdminProfile = asyncHandler(async (req, res) => {
    const { fullName,  gender, dateOfBirth, bio } = req.body;
    let { phoneNumber, highestEducation } = req.body;
    const { _id: userId } = req.user;  
  
    
    console.log("Parsed phoneNumber:", phoneNumber);

    // Check if College Admin Profile already exists
    const existingProfile = await CollegeAdminProfile.findOne({ userId });
    if (existingProfile) throw new ApiError(409, "College Admin Profile already exists");

    let profilePicture = { url: "", public_id: "" };
    let verificationDocuments = [];

    // Upload Profile Picture (if provided)
    if (req.files?.profilePicture) {
        const uploadedProfilePic = await uploadOnCloudinary(req.files.profilePicture[0].path,"image");
        if (uploadedProfilePic) {
            profilePicture = { url: uploadedProfilePic.secure_url, public_id: uploadedProfilePic.public_id };
        }
    }

    // Upload Verification Documents (if provided)
    if (req.files?.verificationDocuments) {
        for (const file of req.files.verificationDocuments) {
            const uploadedDoc = await uploadOnCloudinary(file.path, "pdf");
            if (uploadedDoc) {
                verificationDocuments.push({ url: uploadedDoc.secure_url, public_id: uploadedDoc.public_id });
            }
        }
    }
    console.log("Uploaded Profile Picture:");
    if (typeof phoneNumber === "string") {
        phoneNumber = JSON.parse(phoneNumber);
        console.log("Parsed phoneNumber:", phoneNumber);
    }
    
    if (typeof highestEducation === "string") {
        highestEducation = JSON.parse(highestEducation);
        console.log("Parsed highestEducation:", highestEducation);
    }

    console.log('Testing 5')
    // Create College Admin Profile
    const collegeAdminProfile = await CollegeAdminProfile.create({
        userId,
        fullName,
        phoneNumber,
        gender,
        dateOfBirth,
        highestEducation,
        profilePicture,
        verificationDocuments,
        bio: bio ? bio : undefined
    });

    if (!collegeAdminProfile) throw new ApiError(500, "Failed to create College Admin Profile");

    res.status(201).json(new ApiResponse(201, collegeAdminProfile, "College Admin Profile created successfully"));
});


export const getCollegeAdminProfile = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;

    const collegeAdminProfile = await CollegeAdminProfile.findOne({ userId });
    if (!collegeAdminProfile) throw new ApiError(404, "College Admin Profile not found");

    res.status(200).json(new ApiResponse(200, collegeAdminProfile, "College Admin Profile fetched successfully"));
});


// export const updateCollegeAdminProfile = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { email, phoneNumber, gender, dateOfBirth, highestEducation, experience, role, bio } = req.body;

//     if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid College Admin ID");

//     const collegeAdminProfile = await CollegeAdminProfile.findById(id);
//     if (!collegeAdminProfile) throw new ApiError(404, "College Admin Profile not found");

//     // Ensure the user is authorized to update the profile
//     if (req.user._id.toString() !== collegeAdminProfile.userId.toString()) {
//         throw new ApiError(403, "Forbidden: You can only update your own profile");
//     }

//     // Update fields if provided
//     const updatedProfile = await CollegeAdminProfile.findByIdAndUpdate(id, {
//         highestEducation,
//         experience,
//         bio
//     }, { new: true, runValidators: true });

//     res.status(200).json(new ApiResponse(200, updatedProfile, "College Admin Profile updated successfully"));
// });


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
