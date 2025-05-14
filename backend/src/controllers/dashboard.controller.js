import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { College } from "../models/college.model.js";
import { AvailableCollegeStreams } from "../constants.js";

// Fetch top 10 colleges based on rankingNIRF for each stream
const getTopTensCollege = asyncHandler(async (req, res) => {
  const results = {};

  await Promise.all(
    AvailableCollegeStreams.map(async (stream) => {
      const topColleges = await College.aggregate([
        {
          $match: { typeOfCollege: stream }
        },
        {
          $sort: { rankingNIRF: 1 }
        },
        {
          $limit: 10
        },
        // Lookup streams associated with the college
        {
          $lookup: {
            from: "streams",
            localField: "_id",
            foreignField: "collegeId",
            as: "streams"
          }
        },
        {
          $unwind: {
            path: "$streams",
            preserveNullAndEmptyArrays: true
          }
        },
        // Lookup courses associated with each stream
        {
          $lookup: {
            from: "courses",
            localField: "streams._id",
            foreignField: "streamId",
            as: "streams.courses",

            pipeline: [
              {
                $project: {
                    _id: 0,
                  branches: 1,
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$_id",
            collegeName: { $first: "$collegeName" },
            rankingNIRF: { $first: "$rankingNIRF" },
            university: { $first: "$university" },
            type: { $first: "$type" },
            typeOfCollege: { $first: "$typeOfCollege" },
            instituteId: { $first: "$instituteId" },
            logo_tag: { $first: "$logo_tag" },
            address: { $first: "$address" },
            streams: { $push: "$streams" }
          }
        }
      ]);

      results[stream] = topColleges;
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, results, "Top 10 colleges with streams and courses fetched successfully"));
});

// Fetch all colleges based on typeOfCollege with pagination
const getAllColleges = asyncHandler(async (req, res) => {
  const { typeOfCollege } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  if (!typeOfCollege) {
    throw createHttpError(400, "typeOfCollege parameter is required");
  }

  // Total count (for pagination metadata)
  const total = await College.countDocuments({ typeOfCollege });

  const colleges = await College.aggregate([
    {
      $match: { typeOfCollege }
    },
    {
      $sort: { rankingNIRF: 1 }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    // Lookup streams associated with the college
    {
      $lookup: {
        from: "streams",
        localField: "_id",
        foreignField: "collegeId",
        as: "streams"
      }
    },
    {
      $unwind: {
        path: "$streams",
        preserveNullAndEmptyArrays: true
      }
    },
    // Lookup courses associated with each stream
    {
      $lookup: {
        from: "courses",
        localField: "streams._id",
        foreignField: "streamId",
        as: "streams.courses",
        pipeline: [
          {
            $project: {
              _id: 0,
              branches: 1,
            },
          },
        ],
      },
    },
    // Group back the college document with array of streams (each stream includes its courses)
    {
      $group: {
        _id: "$_id",
        collegeName: { $first: "$collegeName" },
        rankingNIRF: { $first: "$rankingNIRF" },
        university: { $first: "$university" },
        type: { $first: "$type" },
        typeOfCollege: { $first: "$typeOfCollege" },
        instituteId: { $first: "$instituteId" },
        logo_tag: { $first: "$logo_tag" },
        address: { $first: "$address" },
        streams: { $push: "$streams" }
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      colleges,
    }, "Colleges fetched successfully")
  );
});



export { getTopTensCollege, getAllColleges };
