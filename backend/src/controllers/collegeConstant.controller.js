import asyncHandler from "../utils/asyncHandler.js";
import { CollegeCourse, CollegeEntranceExam, CollegesStream } from "../models/collegeConstant.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { College } from "../models/college.model.js";
import { Stream } from "../models/stream.model.js";
import { Course } from "../models/course.model.js";

// Create ConstantData
export const createConstantDataMany = asyncHandler(async (req, res) => {
    
    // if (!Array.isArray(dataArray) || dataArray.length === 0) {
    //     throw new ApiError(400, "Invalid data array");
    // }
    // if (dataArray.some(item => !item.course || !item.typeOfCollege)) {
    //     throw new ApiError(400, "Invalid data format");
    // }
    // const createdDocs = await CollegeCourse.insertMany(dataArray);

    // if (!createdDocs || createdDocs.length === 0) {
    //     throw new ApiError(500, "Failed to create ConstantData");
    // }

    res.status(201).json(new ApiResponse("ConstantData created successfully", createdDocs));
});

export const createConstantStreamDataMany = asyncHandler(async (req, res) => {
   
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        throw new ApiError(400, "Invalid data array");
    }
    if (dataArray.some(item => !item.stream || !item.typeOfCollege)) {
        throw new ApiError(400, "Invalid data format");
    }
    const createdDocs = await CollegesStream.insertMany(dataArray);

    if (!createdDocs || createdDocs.length === 0) {
        throw new ApiError(500, "Failed to create ConstantData");
    }
    res.status(201).json(new ApiResponse("ConstantData for Stream created successfully", createdDocs));
})

export const createConstantEntranceExamDataMany = asyncHandler(async (req, res) => {

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        throw new ApiError(400, "Invalid data array");
    }
    if (dataArray.some(item => !item.exam || !item.typeOfCollege)) {
        throw new ApiError(400, "Invalid data format");
    }
    const createdDocs = await CollegeEntranceExam.insertMany(dataArray);
    if (!createdDocs || createdDocs.length === 0) {
        throw new ApiError(500, "Failed to create ConstantData");
    }
    res.status(201).json(new ApiResponse("ConstantData for Entrance Exam created successfully", createdDocs));
});

export const getConstantData = asyncHandler(async (req, res) => {
    const { typeOfCollege } = req.query;
    const query = typeOfCollege ? { typeOfCollege } : {};
    const data = await CollegeCourse.find(query)
    .sort({ typeOfCollege: 1, course: 1 })
    .select("course -_id");

    const formattedData = data.map(item => item.course);
    console.log("formattedData", formattedData);

    if (!data || data.length === 0) {
        throw new ApiError(404, "ConstantData not found");
    }
    res.status(200).json(new ApiResponse("ConstantData fetched successfully", formattedData));
});

export const getConstantStreamData = asyncHandler(async (req, res) => {
    const { typeOfCollege } = req.query;
    const query = typeOfCollege ? { typeOfCollege } : {};
    const data = await CollegesStream.find(query)
    .sort({ typeOfCollege: 1, stream: 1 })
    .select("stream -_id");

    const formattedData = data.map(item => item.stream);

    if (!data || data.length === 0) {
        throw new ApiError(404, "ConstantData for Stream not found");
    }
    res.status(200).json(new ApiResponse("ConstantData for Stream fetched successfully", formattedData));
});

export const getConstantEntranceExamData = asyncHandler(async (req, res) => {
    const { typeOfCollege } = req.query;
    const query = typeOfCollege ? { typeOfCollege } : {};
    const data = await CollegeEntranceExam.find(query)
    .sort({ typeOfCollege: 1, exam: 1 })
    .select("exam -_id");

    const formattedData = data.map(item => item.exam);

    if (!data || data.length === 0) {
        throw new ApiError(404, "ConstantData for Entrance Exam not found");
    }
    res.status(200).json(new ApiResponse("ConstantData for Entrance Exam fetched successfully", formattedData));
});


export const getCitys = asyncHandler(async (req, res) => {
    const city = await College.distinct("address.city");
    if (!city || city.length === 0) {
        throw new ApiError(404, "City not found");
    }
    res.status(200).json(new ApiResponse("City fetched successfully", city));
}
);

export const getAllStreams = asyncHandler(async (req, res) => {
    const streams = await Stream.distinct("streamName");
    if (!streams || streams.length === 0) {
        throw new ApiError(404, "Streams not found");
    }
    res.status(200).json(new ApiResponse("Streams fetched successfully", streams));
}
);

export const getCourse = asyncHandler(async (req, res) => {
    console.log("getCourse");
   const course = await Course.distinct("branches");
   if (!course || course.length === 0) {
       throw new ApiError(404, "Courses not found");
   }
    res.status(200).json(new ApiResponse("Courses fetched successfully", course));
}
);