import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Stream } from "../models/stream.model.js";
import { College } from "../models/college.model.js";


export const createStream = asyncHandler(async (req, res) => {
    const {  streamName, duration, fees, eligibilityCriteria } = req.body;
    if(![streamName, duration, fees, eligibilityCriteria].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }
    const collegeId = req.params.id;

    const collegeExists = await College.findById(collegeId);
    if (!collegeExists) throw new ApiError(404, "College not found");

    const newStream = await Stream.create({
        collegeId,
        streamName,
        duration,
        fees,
        eligibilityCriteria,
    });

    res.status(201).json(new ApiResponse(201, newStream, "Stream created successfully"));
});


export const getAllStreams = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    const streams = await Stream.findMany({collegeId});
    if(!streams) throw new ApiError(404, "Streams not found");
    res.status(200).json(new ApiResponse(200, streams, "Streams fetched successfully"));
});


export const getStreamById = asyncHandler(async (req, res) => {
    const streamId = req.params.id;
    const stream = await Stream.findById(streamId).populate("collegeId", "collegeName university rankingNIRF logo");
    if (!stream) throw new ApiError(404, "Stream not found");
    res.status(200).json(new ApiResponse(200, stream, "Stream details fetched successfully"));
});


export const updateStream = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { streamName, duration, fees, eligibilityCriteria } = req.body;
    const updatedStream = await Stream.findByIdAndUpdate(id, {
        streamName,
        duration,
        fees,
        eligibilityCriteria
    }, { new: true, runValidators: true });
    if (!updatedStream) throw new ApiError(404, "Stream not found");
    res.status(200).json(new ApiResponse(200, updatedStream, "Stream updated successfully"));
});


export const deleteStream = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedStream = await Stream.findByIdAndDelete(id);
    if (!deletedStream) throw new ApiError(404, "Stream not found");
    res.status(200).json(new ApiResponse(200, null, "Stream deleted successfully"));
});
