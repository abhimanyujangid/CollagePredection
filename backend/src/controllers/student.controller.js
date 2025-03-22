import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import mongoose from "mongoose";
import { StudentProfile } from "../models/student.model.js";
import ApiResponse from "../utils/ApiResponse.js"
import { StudentEducational } from "../models/studentEducational.model.js";


const createStudentProfile = asyncHandler(async (req, res) => {
    const {_id: userId} = req.user;
    const { phoneNumber, dateOfBirth, preferences, gender, cast, hobbies } = req.body;

    // Check if Student Profile already exists
    const existingProfile = await StudentProfile.findOne({ userId });
    if (existingProfile) throw new ApiError(409, "Student profile already exists");

    // Create Student Profile
    const studentProfile = await StudentProfile.create({
        userId,
        phoneNumber,
        dateOfBirth,
        gender,
        cast,
        hobbies,
        preferences,
    });

    if (!studentProfile) throw new ApiError(500, "Failed to create student profile");

    res.status(201).json(new ApiResponse(201, studentProfile, "Student profile created successfully"));
});

const createEducationDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { tenth, twelfth, competitiveExams } = req.body;

    const existingProfile = await StudentEducational.findOne({ userId });
    if (existingProfile) throw new ApiError(409, "Student educational details already exists");

    const studentProfile = await StudentEducational.create({
        userId,
        tenth,
        twelfth,
        competitiveExams,
    });

    if (!studentProfile) throw new ApiError(500, "Failed to create student educational details");

    res.status(201).json(new ApiResponse(201, studentProfile, "Student educational details created successfully"));
});

const updateStudentProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { phoneNumber, dateOfBirth, preferences, gender, cast, hobbies } = req.body;

    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid Student ID");

    const studentProfile = await StudentProfile.findById(id);
    if (!studentProfile) throw new ApiError(404, "Student profile not found");

    // Ensure the user is authorized to update the profile
    if (req.user?._id.toString() !== studentProfile.userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only update your own profile");
    }

    // Update fields if provided
    const updatedProfile = await StudentProfile.findByIdAndUpdate(id,
        {
            $set: {
                phoneNumber,
                dateOfBirth,
                preferences,
                gender,
                cast,
                hobbies
            }
        },
        { new: true }
    )

    if (!updatedProfile) throw new ApiError(500, "Failed to update student profile");

    res.status(200).json(new ApiResponse(200, updatedProfile, "Student profile updated successfully"));
});

const updateEducationDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { tenth, twelfth, competitiveExams } = req.body;

    if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid Student ID");

    const studentProfile = await StudentEducational.findById(id);
    if (!studentProfile) throw new ApiError(404, "Student educational details not found");

    // Ensure the user is authorized to update the profile
    if (req.user?._id.toString() !== studentProfile.userId.toString()) {
        throw new ApiError(403, "Forbidden: You can only update your own profile");
    }

    // Update fields if provided
    const updatedProfile = await StudentEducational.findByIdAndUpdate(id,
        {
            $set: {
                tenth,
                twelfth,
                competitiveExams
            }
        },
        { new: true }
    )

    if (!updatedProfile) throw new ApiError(500, "Failed to update student educational details");

    res.status(200).json(new ApiResponse(200, updatedProfile, "Student educational details updated successfully"));
});

const getStudentData = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const [studentProfile, studentEducational] = await Promise.all([
        StudentProfile.findOne({ userId }),
        StudentEducational.findOne({ userId }),
    ]);

    if (!studentProfile || !studentEducational) throw new ApiError(404, "Student profile not found");

    res.status(200).json(new ApiResponse(200, { student: studentProfile, studentEducational }, "Student profile fetched successfully"));
});

// export const getStudentProfile = asyncHandler(async (req, res) => {
//     const { _id: userId } = req.params;

//     if (!mongoose.isValidObjectId(userId)) throw new ApiError(400, "Invalid User ID");

//     const studentProfile = await StudentProfile.findOne({ userId }).populate("userId", "fullName email");

//     if (!studentProfile) throw new ApiError(404, "Student profile not found");

//     res.status(200).json(new ApiResponse(200, studentProfile, "Student profile fetched successfully"));
// });


// export const deleteStudentProfile = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid Student ID");

//     const studentProfile = await StudentProfile.findById(id);
//     if (!studentProfile) throw new ApiError(404, "Student profile not found");

//     // Ensure the user is authorized to delete the profile
//     if (req.user._id.toString() !== studentProfile.userId.toString()) {
//         throw new ApiError(403, "Forbidden: You can only delete your own profile");
//     }

//     await StudentProfile.findByIdAndDelete(id);

//     res.status(200).json(new ApiResponse(200, null, "Student profile deleted successfully"));
// });



export {
    createStudentProfile,
    createEducationDetails,
    updateStudentProfile,
    getStudentData,
    updateEducationDetails
}