import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Stream } from "../models/stream.model.js";
import { Course } from "../models/course.model.js";
import { College } from "../models/college.model.js";
import { Categorie } from "../models/categories.model.js";
import { IIT_ENG } from "../CollegeDB/IIT_ENG.js";
import { OTHER_INSTITUTE_BETCH } from "../CollegeDB/OTHER_INSTITUTE_BETCH.js";
import { MANGMENT } from "../CollegeDB/MANAGEMENT.js";

// import { OTHER_INSTITUTE_BETCH } from "../CollegeDB/OTHER_INSTITUTE_BETCH.js";

/**
 * @desc Uploads college data to the database
 * @route POST /api/v1/upload/college
 * @access Private
 */
export const uploadCollege = asyncHandler(async (req, res) => {
    console.log("Upload API triggered");

    const data = MANGMENT;
    console.log("Input college data count:", data.length);
    const administratorId = "67e2d550f62f96c6a50f2308";
    if (!administratorId) {
        throw new ApiError(401, "Unauthorized access");
    }

    // // Optional: clear previous data
    // await College.deleteMany({ administratorId });
    // await Stream.deleteMany({});
    // await Course.deleteMany({});
    // await Categorie.deleteMany({});

// const allManagement = await College.find({ typeOfCollege: "management" });
// console.log("All management colleges:", allManagement.length);
// return res.status(200).json(
//      new ApiResponse(200, allManagement, "Fetched all management colleges successfully")
// );

// // Optional: clear previous data
// await College.deleteMany({ typeOfCollege: "management" });
// console.log("Deleted all management colleges from the database");
// return res.status(200).json(
//     new ApiResponse(200, null, "Deleted all management colleges successfully")
// );

    // return

    let createdColleges = 0;
    let createdStreams = 0;
    let createdCourses = 0;
    let createdCategories = 0;

    try {
        for (const collegeData of data) {
            // Prevent duplicate colleges
            const existing = await College.findOne({ instituteId: collegeData.instituteId });
            if (existing) {
                console.log(`Skipping duplicate college: ${collegeData.collegeName}`);
                continue;
            }

            const college = await College.create({
                administratorId,
                collegeName: collegeData.collegeName,
                university: collegeData.university,
                instituteId: collegeData.instituteId,
                logo_tag: collegeData.logo_tag,
                website: collegeData.website,
                averagePackage: {
                    min: collegeData.averagePackage.min,
                    max: collegeData.averagePackage.max
                },
                type: collegeData.type.trim().toLowerCase(),
                typeOfCollege: collegeData.typeOfCollege,
                address: {
                    city: collegeData.city,
                    state: collegeData.state,
                    country: "India"
                },
                campusLife: collegeData.campusLife,
                infrastructureScore:  collegeData.infrastructureScore,
                alumniScore: collegeData.alumniScore,
                placementScore: collegeData.placementScore,
                rankingNIRF: collegeData.rankingNIRF,
                teacherLeanerRatio: collegeData.teacherLearnerRatio,
                researchScore: collegeData.researchScore,
                graducationOutcome: collegeData.graducationOutcome,
                perceptionScore: collegeData.perceptionScore
            });
            createdColleges++;
            console.log(`Created college: ${college.collegeName}`);

            const streamPromises = collegeData.branches.map(async (branchData) => {
                const exam = collegeData.logo_tag === "iit" ? "jee_advanced" : "jee_mains";
                const stream = await Stream.create({
                    collegeId: college._id,
                    streamName: branchData.streamName,
                    streamType: branchData.streamType,
                    duration: branchData.streamType === "undergraduate" ? 3 : 2,
                    fees: 0,
                    eligibilityCriteria: {
                        minTwelfthPercentage: 60,
                        requiredExams: ""
                    }
                });
                createdStreams++;

                // const coursePromises = branchData.courses.map(async (courseData) => {
                //     const course = await Course.create({
                //         streamId: stream._id,
                //         branches: courseData.branches
                //     });
                //     createdCourses++;

                //     const categoryPromises = courseData.Categories.map(async (categoryData) => {
                //         await Categorie.create({
                //             courseId: course._id,
                //             caste: categoryData.caste,
                //             gender: categoryData.gender,
                //             quotas: categoryData.quotas.map(quota => ({
                //                 quotaName: quota.quotaName,
                //                 data: Object.entries(quota.data[0]).map(([year, rank]) => ({
                //                     year: parseInt(year),
                //                     rank: rank === null ? null : rank
                //                 }))
                //             }))
                //         });
                //         createdCategories++;
                //     });

                //     await Promise.all(categoryPromises);
                //     return course;
                // });

                // await Promise.all(coursePromises);
                return stream;
            });

            await Promise.all(streamPromises);
        }

        return res.status(201).json(
            new ApiResponse(201, {
                createdColleges,
                createdStreams,
                createdCourses,
                createdCategories
            }, "All colleges data uploaded successfully")
        );

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            throw new ApiError(400, `Validation error: ${messages.join(', ')}`);
        }
        throw new ApiError(500, `Database upload failed: ${error.message}`);
    }
});
