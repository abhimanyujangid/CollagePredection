import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { College } from "../models/college.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { CollegeAdminProfile } from "../models/collegeAdminProfile.model.js";
import mongoose from "mongoose";
import { Stream } from "../models/stream.model.js";
import { Course } from "../models/course.model.js";

//=============================CREATE COLLEGE=============================
export const createCollege = asyncHandler(async (req, res) => {
    try {
        const { collegeName, rankingNIRF, university, type, typeOfCollege, website, email, contactNumber, description } = req.body;


        const { _id: userId } = req.user;
        let { address, placementStatistics } = req.body;

        const collegeExists = await College.findOne({ collegeName: collegeName.toLowerCase(), university: university.toLowerCase() });
        console.log(collegeExists);
        if (collegeExists) {
            throw new ApiError(400, "College already exists");
        }

        const administratorExists = await CollegeAdminProfile.findOne({ userId });
        if (!administratorExists || administratorExists.status !== "approved") {
            throw new ApiError(400, "Sorry, you are not authorized to create a college");
        }

        let logo = { url: "", public_id: "" };
        if (req.files?.logo) {
            const uploadedLogo = await uploadOnCloudinary(req.files.logo[0].path, "image");
            if (uploadedLogo) {
                logo = { url: uploadedLogo.secure_url, public_id: uploadedLogo.public_id };
            }
        }

        if (typeof address === "string") {
            address = JSON.parse(address);
        }
        if (typeof placementStatistics === "string") {
            placementStatistics = JSON.parse(placementStatistics);
        }

        

        const newCollege = await College.create({
            administratorId: userId,
            collegeName: collegeName.toLowerCase(),
            rankingNIRF,
            university: university.toLowerCase(),
            address,
            website: website ? website : "",
            email: email ? email : "",
            contactNumber: contactNumber ? contactNumber : "",
            logo,
            description: description ? description : "",
            placementStatistics: placementStatistics ? placementStatistics : "",
            type,
            typeOfCollege,
        });

        res.status(201).json(new ApiResponse(201, newCollege, "College created successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || "Internal Server Error"));
    }
});

//=============================GET ALL COLLEGES=============================
export const getAdministratorAllColleges = asyncHandler(async (req, res) => {
    const administratorId = req.user._id;
    const { page = 1, limit = 10, filter } = req.query;
    const skip = (page - 1) * limit;

    // Parse filter into an array if it's a string (e.g., from query string)
    let filterArray = [];
    if (filter) {
        try {
            filterArray = Array.isArray(filter)
                ? filter
                : typeof filter === "string"
                ? JSON.parse(filter)
                : [];
        } catch (e) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid filter format"));
        }
    }

    const matchStage = {
        administratorId,
        ...(filterArray.length > 0 && { typeOfCollege: { $in: filterArray } })
    };

    const pipeline = [
        { $match: matchStage },
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [{ $skip: skip }, { $limit: parseInt(limit) }]
            }
        }
    ];

    const result = await College.aggregate(pipeline);
    const total = result[0].metadata.length ? result[0].metadata[0].total : 0;
    const totalPages = Math.ceil(total / limit);
    const colleges = result[0].data;

    if (!colleges.length) throw new ApiError(404, "Colleges not found");

    res.status(200).json(
        new ApiResponse(
            200,
            { colleges, total, currentPage: parseInt(page), totalPages },
            "Colleges fetched successfully"
        )
    );
});


//=============================CREATE STREAM=============================
export const createStreamOfCollege = asyncHandler(async (req, res) => {
    const { collegeId } = req.params;
    const { streamName, type, duration, fees, eligibilityCriteria } = req.body;
    const { _id: userId } = req.user;

    // Validate MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
        throw new ApiError(400, "Invalid college ID format");
    }
    if(!streamName || !type || !duration  || !eligibilityCriteria) {
        throw new ApiError(400, "All fields are required");
    }

    const college = await College.findById(collegeId);
    if (!college) throw new ApiError(404, "College not found");

    
    const newStream = await Stream.create({
        collageId: collegeId,
        streamName,
        type,
        duration,
        fees,
        eligibilityCriteria,
    });
    if (!newStream) throw new ApiError(400, "Failed to create stream");
    // Update the college with the new stream ID
    res.status(201).json(new ApiResponse(201, newStream, "Stream created successfully"));
});

//============================= Delete Stream =============================
export const deleteStream = asyncHandler(async (req, res) => {

    const { streamId } = req.params;
    if (!streamId) throw new ApiError(400, "Invalid Stream ID");
    const deletedStream = await Stream.findByIdAndDelete(streamId);
    if (!deletedStream) throw new ApiError(404, "Stream not found");

    const deletedCourses = await Course.deleteMany({ streamId });

    if (deletedCourses.deletedCount > 0) {
        console.log(`Deleted ${deletedCourses.deletedCount} courses associated with stream ID ${streamId}`);
    }

    res.status(200).json(new ApiResponse(200, null, "Stream deleted successfully"));
}
);

//=============================GET ALL COURSES=============================
export const getCollegeById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid college ID format");
        }

        const collegeId = new mongoose.Types.ObjectId(id);

        // Aggregation pipeline with proper data handling and categories integration
        const college = await College.aggregate([
            { $match: { _id: collegeId } },
            {
                $lookup: {
                    from: 'streams',
                    localField: '_id',
                    foreignField: 'collegeId',
                    as: 'streams',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'courses',
                                localField: '_id',
                                foreignField: 'streamId',
                                as: 'courses',
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: 'categories',
                                            localField: '_id',
                                            foreignField: 'courseId',
                                            as: 'categories',
                                            pipeline: [
                                                {
                                                    $project: {
                                                        _id: 1,
                                                        courseId: 1,
                                                        caste: 1,
                                                        gender: 1,
                                                        quotas: {
                                                            $map: {
                                                                input: "$quotas",
                                                                as: "quota",
                                                                in: {
                                                                    quotaName: "$$quota.quotaName",
                                                                    data: {
                                                                        $ifNull: ["$$quota.data", []]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                { $sort: { caste: 1, "quotas.quotaName": 1 } }
                                            ]
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            streamId: 1,
                                            branches: { $ifNull: ['$branches', []] },
                                            categories: { $ifNull: ['$categories', []] }
                                        }
                                    }
                                ]
                            }
                        },
                        { 
                            $project: {
                                _id: 1,
                                streamName: 1,
                                streamType: 1,
                                duration: 1,
                                fees: 1,
                                eligibilityCriteria: 1,
                                courses: { $ifNull: ['$courses', []] }
                            }
                        },
                        { $sort: { streamName: 1 } }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    collegeName: 1,
                    rankingNIRF: { $ifNull: ['$rankingNIRF', 0] },
                    university: 1,
                    type: 1,
                    typeOfCollege: 1,
                    instituteId: 1,
                    logo_tag: { $ifNull: ['$logo_tag', ''] },
                    address: {
                        $ifNull: [
                            '$address',
                            { city: '', state: '', country: 'India' }
                        ]
                    },
                    website: { $ifNull: ['$website', ''] },
                    contactNumber: { $ifNull: ['$contactNumber', ''] },
                    email: { $ifNull: ['$email', ''] },
                    description: { $ifNull: ['$description', ''] },
                    teacherLeanerRatio: { $ifNull: ['$teacherLeanerRatio', 0] },
                    researchScore: { $ifNull: ['$researchScore', 0] },
                    perceptionScore: { $ifNull: ['$perceptionScore', 0] },
                    graducationOutcome: { $ifNull: ['$graducationOutcome', 0] },
                    placementStatistics: {
                        $ifNull: [
                            '$placementStatistics',
                            {
                                averagePackage: 0,
                                highestPackage: 0,
                                topRecruiters: []
                            }
                        ]
                    },
                    streams: { $ifNull: ['$streams', []] },
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);

        if (!college?.length) {
            throw new ApiError(404, "College not found");
        }

        return res.status(200).json(
            new ApiResponse(200, college[0], "College details fetched successfully")
        );

    } catch (error) {
        console.error('Error in getCollegeById:', error);
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return res.status(statusCode).json(new ApiError(statusCode, message));
    }
});

//=============================UPDATE COLLEGE=============================
export const updateCollege = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    const { collegeName, rankingNIRF, university, address, website, email, contactNumber, description, placementStatistics } = req.body;
    const updatedCollege = await College.findByIdAndUpdate(
        collegeId,
        {
            collegeName,
            rankingNIRF,
            university,
            address,
            website,
            email,
            contactNumber,
            description,
            placementStatistics
        },
        { new: true }
    );

    if (!updatedCollege) throw new ApiError(404, "College not found");

    res.status(200).json(new ApiResponse(200, updatedCollege, "College updated successfully"));
});

//=============================DELETE COLLEGE=============================
export const deleteCollege = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    if (!collegeId) throw new ApiError(400, "Invalid College ID");
    const deletedCollege = await College.findByIdAndDelete(collegeId);

    if (!deletedCollege) throw new ApiError(404, "College not found");

    res.status(200).json(new ApiResponse(200, null, "College deleted successfully"));
});



//=============================CREATE COURSE=============================
export const createCourseOfStream = asyncHandler(async (req, res) => {
    const { streamId } = req.params;
    const {  branches, seats,  minimumEntranceScore } = req.body;

    

    // Validate MongoDB ObjectID
    if(![ branches, seats, minimumEntranceScore].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }

    if(!mongoose.Types.ObjectId.isValid(streamId)) {
        throw new ApiError(400, "Invalid stream ID format");
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

//============================= Update Course =============================
export const updateCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { branches, seats,  minimumEntranceScore } = req.body;
    // Validate MongoDB ObjectID

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new ApiError(400, "Invalid course ID format");
    }
    if(![ branches, seats,minimumEntranceScore].every(Boolean)) {
        throw new ApiError(400, "All fields are required");
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
        branches,
        seats,
        minimumEntranceScore
    }, { new: true, runValidators: true });
    if (!updatedCourse) throw new ApiError(404, "Course not found");
    res.status(200).json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
});

//=============================DELETE COURSE=============================
export const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    if (!courseId) throw new ApiError(400, "Invalid Course ID");
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) throw new ApiError(404, "Course not found");

    res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
})