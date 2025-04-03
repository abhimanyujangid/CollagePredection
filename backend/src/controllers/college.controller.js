import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { College } from "../models/college.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { CollegeAdminProfile } from "../models/collegeAdminProfile.model.js";
import mongoose from "mongoose";


export const createCollege = asyncHandler(async (req, res) => {
    try {
        const { collegeName, rankingNIRF, university, type, typeOfCollege, website, email, contactNumber, description } = req.body;
        const { _id: userId } = req.user;
        let { address, placementStatistics } = req.body;

        const collegeExists = await College.findOne({ collegeName });
        if (collegeExists) throw new ApiError(400, "College name already exists");

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
            collegeName,
            rankingNIRF,
            university,
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

export const getAdministratorAllColleges = asyncHandler(async (req, res) => {
    const administratorId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;




    const pipeline = [
        { $match: { administratorId } },
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

    res.status(200).json(new ApiResponse(200, { colleges, total, currentPage: parseInt(page), totalPages }, "Colleges fetched successfully"));
});



export const getCollegeById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Validate MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid college ID format");
        }

        const collegeId = new mongoose.Types.ObjectId(id);

        // Use aggregation pipeline to fetch college with related streams and courses
        const college = await College.aggregate([
            {
                $match: {
                    _id: collegeId
                }
            },
            {
                $lookup: {
                    from: 'streams',
                    localField: '_id',
                    foreignField: 'collageId',
                    as: 'streams',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'courses',
                                localField: '_id',
                                foreignField: 'streamId',
                                as: 'courses'
                            }
                        },
                        { $sort: { streamName: 1 } }
                    ]
                }
            },

            {
                $project: {
                    _id: 1,
                    administratorId: 1,
                    collegeName: 1,
                    rankingNIRF: { $ifNull: ['$rankingNIRF', 0] },
                    university: 1,
                    type: 1,
                    typeOfCollege: 1,
                    logo: { $ifNull: ['$logo', { public_id: '', url: '' }] },
                    address: {
                        city: '$address.city',
                        state: '$address.state',
                        country: { $ifNull: ['$address.country', 'India'] }
                    },
                    website: { $ifNull: ['$website', ''] },
                    email: { $ifNull: ['$email', ''] },
                    contactNumber: { $ifNull: ['$contactNumber', ''] },
                    description: { $ifNull: ['$description', ''] },
                    rating: { $ifNull: ['$rating', 0] },
                    placementStatistics: {
                        averagePackage: { $ifNull: ['$placementStatistics.averagePackage', 0] },
                        highestPackage: { $ifNull: ['$placementStatistics.highestPackage', 0] },
                        topRecruiters: { $ifNull: ['$placementStatistics.topRecruiters', []] }
                    },
                    streams: {
                        $ifNull: ['$streams', []]
                    },
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);
        console.log(college);

        if (!college || college.length === 0) {
            throw new ApiError(404, "College not found");
        }

        return res.status(200).json(
            new ApiResponse(200, college[0], "College details fetched successfully")
        );

    } catch (error) {
        console.error('Error in getCollegeById:', error);
        return res.status(error.statusCode || 500).json(
            new ApiError(error.statusCode || 500, error.message || "Internal Server Error")
        );
    }
});

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


export const deleteCollege = asyncHandler(async (req, res) => {
    const collegeId = req.params.id;
    if (!collegeId) throw new ApiError(400, "Invalid College ID");
    const deletedCollege = await College.findByIdAndDelete(collegeId);

    if (!deletedCollege) throw new ApiError(404, "College not found");

    res.status(200).json(new ApiResponse(200, null, "College deleted successfully"));
});
