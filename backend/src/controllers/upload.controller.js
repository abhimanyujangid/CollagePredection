import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Stream } from "../models/stream.model.js";
import { Course } from "../models/course.model.js";
import { College } from "../models/college.model.js";
import { Categorie } from "../models/categories.model.js";
import { BSC_OTHER } from "../CollegeDB/BSC_OTHER.js";
import { IIT_ENG } from "../CollegeDB/IIT_ENG.js";
import { IIT_DUAL_DEGREE } from "../CollegeDB/IIT_DUAL_DEGREE.js";
import { NIT_DUAL_DEGREE } from "../CollegeDB/NIT_DUAL_DEGREE.js";
import { OTHER_INSTITUTE_BETCH } from "../CollegeDB/OTHER_INSTITUTE_BETCH.js"


/**
 * @desc Uploads college data to the database
 * @route POST /api/v1/upload/college
 * @access Private
 */
export const uploadCollege = asyncHandler(async (req, res) => {
    const data = OTHER_INSTITUTE_BETCH;

    // Get admin ID from authenticated user
    const administratorId = "67e2d550f62f96c6a50f2308";
    if (!administratorId) {
        throw new ApiError(401, "Unauthorized access");
    }

    let createdColleges = 0;
    let createdStreams = 0;
    let createdCourses = 0;
    let createdCategories = 0;

    try {
        // Process colleges sequentially but optimize internal operations
        for (const collegeData of data) {

            // 1. Create College Document first
            const college = await College.create({
                administratorId,
                collegeName: collegeData.collegeName,
                university: collegeData.university,
                instituteId: collegeData.instituteId,
                logo_tag: "eng",
                type: collegeData.type,
                typeOfCollege: "engineering",
                address: {
                    city: collegeData.city,
                    state: collegeData.state,
                    country: "India"
                },
                rankingNIRF: collegeData.rankingNIRF,
                teacherLeanerRatio: collegeData.teacherLearnerRatio,
                researchScore: collegeData.researchScore,
                graducationOutcome: collegeData.graducationOutcome,
                perceptionScore: collegeData.perceptionScore
            });
            createdColleges++;
            const collageId = college._id;

            console.log("Created college:", college.collegeName);
            console.log("Created college ID:", collageId);
            // 2. Process all Streams for this college (concurrently)
            const streamPromises = collegeData.branches.map(async (branchData) => {
                const stream = await Stream.create({
                    collegeId: college._id,
                    streamName: branchData.streamName,
                    streamType: branchData.streamType,
                    duration: 4, // Default duration for engineering
                    fees: 0, // Default value
                    eligibilityCriteria: {
                        minTwelfthPercentage: 75, // Default value
                        requiredExams: ["jee_mains"]  //jee_advanced, jee_mains
                    }
                });
                createdStreams++;


                console.log("Created stream:", stream.streamName);
                // 3. Process all Courses for this stream (concurrently)
                const coursePromises = branchData?.courses.map(async (courseData) => {
                    const course = await Course.create({
                        streamId: stream._id,
                        branches: courseData.branches
                    });
                    createdCourses++;

                    // 4. Process all Categories for this course (concurrently)
                    const categoryPromises = courseData.Categories.map(async (categoryData) => {
                        await Categorie.create({
                            courseId: course._id,
                            caste: categoryData.caste,
                            gender: categoryData.gender,
                            quotas: categoryData.quotas.map(quota => ({
                                quotaName: quota.quotaName,
                                data: Object.entries(quota.data[0]).map(([year, rank]) => ({
                                    year: parseInt(year),
                                    rank: rank === null ? null : rank
                                }))
                            }))
                        });
                        createdCategories++;
                    });
                    console.log("Created course:", course._id);

                    // Wait for all categories to be created for this course
                    await Promise.all(categoryPromises);
                    return course;
                });

                // Wait for all courses to be created for this stream
                await Promise.all(coursePromises);
                return stream;
            });

            // Wait for all streams to be created for this college
            await Promise.all(streamPromises);
        }

        // Return success response
        return res.status(201).json(
            new ApiResponse(201, {
                createdColleges,
                createdStreams,
                createdCourses,
                createdCategories
            }, "All colleges data uploaded successfully")
        );

    } catch (error) {
        // Handle specific errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            throw new ApiError(400, `Validation error: ${messages.join(', ')}`);
        }
        throw new ApiError(500, `Database upload failed: ${error.message}`);
    }
});