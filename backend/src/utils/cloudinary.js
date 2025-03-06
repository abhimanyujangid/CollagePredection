import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload to Cloudinary
export const uploadOnCloudinary = async (localFilePath, fileType = "image") => {
    try {
        if (!localFilePath) return null;

        const resourceType = fileType === "pdf" ? "raw" : "image";

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType,
        });

        // Remove local file after upload
        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Ensure file removal in case of error
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

// Delete from Cloudinary
export const deleteOnCloudinary = async (public_id, resourceType = "image") => {
    try {
        if (!public_id) return null;

        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: resourceType,
        });

        return result;
    } catch (error) {
        console.error("Cloudinary Deletion Error:", error);
        return null;
    }
};
