import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Course } from "../models/course.model.js";
import { Stream } from "../models/stream.model.js";

export const createCourse = asyncHandler(async (req, res) => {
    const { streamId, branches, seats,  minimumEntranceScore } = req.body;
    if(![streamId, branches, seats, minimumEntranceScore].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }
    const streamExists = await Stream.findById(streamId);
    if (!streamExists) throw new ApiError(404, "Stream not found");

    const newCourse = await Course.create({
        streamId,
        branches,
        seats,
        minimumEntranceScore,
    });

    res.status(201).json(new ApiResponse(201, newCourse, "Course created successfully"));
});

export const getAllCourses = asyncHandler(async (req, res) => {
    const { streamId } = req.params;
    const courses = await Course.findMany({streamId});
    if(!courses) throw new ApiError(404, "Courses not found");  

    res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

export const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { branches, seats,  minimumEntranceScore } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, {
        branches,
        seats,
        minimumEntranceScore
    }, { new: true, runValidators: true });
    if (!updatedCourse) throw new ApiError(404, "Course not found");
    res.status(200).json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
});


export const deleteCourse = asyncHandler(async (req, res) => {
const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) throw new ApiError(404, "Course not found");

    res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
});
