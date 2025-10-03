import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadOnCloudinary = async(localFilePath: string) => {
    try{
        if(!localFilePath) return null;
        const stats = fs.statSync(localFilePath);
        console.log("Uploading file of size:", (stats.size / 1024 / 1024).toFixed(2), "MB");
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            timeout: 120000,
        })
        console.log("File uploaded on cloudinary", response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath);
        console.log("error in file upload to cloudinary", error);
        return null;
    }
}