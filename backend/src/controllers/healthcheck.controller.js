import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";


export const healthcheck = asyncHandler(async (_req, res) => {
    return res.status(200).json(
        new ApiResponse(200, {}, "Health check passed")
    );
});
